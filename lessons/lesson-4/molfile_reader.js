/**
 * A simple molfile reader adapted from TwirlyMol (http://github.com/baoilleach/twirlymol)
 * by Noel O'Boyle, licensed under the MIT License.
 *
 * @constructor
 */
m3d.MolfileReader = function() {
  
};

/**
 * @param {string} molfile
 * @return {Object}
 */
m3d.MolfileReader.prototype.read = function(molfile) {
  var lines = molfile.split("\n");
  var atomCount = parseFloat(lines[3].substring(0, 3));
  var bondCount = parseFloat(lines[3].substring(3, 6));
  var atoms = [];
  var bonds = [];
  
  for (var i = 0; i < atomCount; i++) {
    atoms.push({
      position: new PhiloGL.Vec3(
        parseFloat(lines[i + 4].substring(0, 10)),
        parseFloat(lines[i + 4].substring(10, 20)),
        parseFloat(lines[i + 4].substring(20, 30))
      )
    });
  }
  
  for (var i = 0; i < bondCount; i++) {
    var line = lines[i + 4 + atomCount];
    
    bonds.push({
      source: atoms[parseInt(line.substring(0, 3)) - 1],
      target: atoms[parseInt(line.substring(3, 6)) - 1],
      getLength: function() {
        var sub = this.source.position.sub(this.target.position);
        return Math.pow((Math.pow(sub.x, 2) + Math.pow(sub.y, 2) + Math.pow(sub.z, 2)), 0.5);
      },
      getMidpoint: function() {
        var dx = 0.5 * (this.target.position.x - this.source.position.x);
        var dy = 0.5 * (this.target.position.y - this.source.position.y);
        var dz = 0.5 * (this.target.position.z - this.source.position.z);
        var distance = new PhiloGL.Vec3(dx, dy, dz);
        
        return this.source.position.add(distance);
      },
      getRotation: function() {
        var sub = this.source.position.sub(this.target.position);
        var length = this.getLength();
        
        // TODO: how to calculate these angles?
        var rx = 0;
        var ry = 0;
        var rz = 0;
        
        return new PhiloGL.Vec3(
          rx, ry, rz
        );
      }
    });
  }

  return {
    atoms: atoms,
    bonds: bonds
  };
};