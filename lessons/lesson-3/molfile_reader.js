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
  var atoms = [];
  
  for (var i = 0; i < atomCount; i++) {
    atoms.push({
      x: parseFloat(lines[i + 4].substring(0, 10)),
      y: parseFloat(lines[i + 4].substring(10, 20)),
      z: parseFloat(lines[i + 4].substring(20, 30))
    });
  }

  return { atoms: atoms };
};