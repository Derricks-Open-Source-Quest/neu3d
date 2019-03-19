import { Neu3D } from './src/neu3d';

/**
 * Custom Function to Animate Camera Movement
 * 
 * @param interval time inveral (ms) at which the bloompass is updated
 * @param period   period (ms) of bloom pass oscillation
 * @param amplitude bloompass value is in range [0,amplitude]
 */
Neu3D._animateBPTimer = undefined;
Neu3D.prototype.animateBloomPass = function (interval=100, period=1000, amplitude=1){
    if (this._animateBPTimer === undefined){
	this._animateBPTimer = setInterval(()=>{
	    let d = new Date();
	    let bp = amplitude * (1+Math.sin( 2*3.1415*(d.getTime() % period)/period));
	    this.settings.bloomPass.strength = bp;
	}, interval);
    }
}

Neu3D.prototype.stopBloomPass = function(clear=false){
    clearInterval(this._animateBPTimer);
    
    if (clear === true){ // reset to default value
	this.settings.bloomPass.strength = 0.2; 
    }
    this._animateBPTimer = undefined;
}


/**
 * Add a button to toggle animateBloomPass 
 */
Neu3D.prototype.addBloomPassBtn= function(){
    const _createBtn = (name, icon, iconAttrs, tooltip, func) =>{
	let newButton = function () {
	    this[name] = func;
	};
	let btn = new newButton();
	let buttonid = this.controlPanel.add(btn, name).title(tooltip).icon(icon,"strip",iconAttrs);
	return buttonid;
    }

    let newBtn = _createBtn("toggleBP", "far fa-sun", {}, "Toggle Animate BloomPass",
			    () => {
				
				if (this._animateBPTimer === undefined){
				    this.animateBloomPass();
				}else{
				    this.stopBloomPass();
				}
			    }
			   );
    window.newBtn = newBtn;
    // this is a hacky way to add the UI button.
    // Neu3D.controlPanel.__ul gives an unordered list of all buttons in the dat.GUI.
    // children[2] points to the first UI button.
    this.controlPanel.__ul.insertBefore(newBtn.__li, this.controlPanel.__ul.children[2]);
}
export { Neu3D };
