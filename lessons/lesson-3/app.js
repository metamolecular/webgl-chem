/**
 * @param {string} id
 * @param {object} params hash
 */
m3d.createView = function(id, params) {
  var view = new m3d.View(500, 500);
  
  view.render(document.getElementById(id));
  
  var reader = new m3d.MolfileReader();
  var molecule = reader.read(params.file);
  
  for (var i = 0; i < molecule.atoms.length; i++) {
    var atom = molecule.atoms[i];
    
    view.drawAtom(atom.x, atom.y, atom.z);
  }
  
  view.redraw();
  
  return view;
};