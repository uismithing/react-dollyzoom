import React, {Component, PropTypes} from "react";
import ReactDOM from "react-dom";
import {VelocityComponent, VelocityTransitionGroup, velocityHelpers} from "velocity-react";
import {VelocityAnimate, VelocityUi} from "velocity-animate";
import _ from "lodash";
import $ from "jquery";
//
//*************************
//*************************
// Nonpublished Imports
//
function updateState(ScopeProxy, Parcel)
{
	let existingState
		= (ScopeProxy.state !== null)
		? _.cloneDeep(ScopeProxy.state)
		: {};
	let adjustedState
		= _.merge(existingState, _.cloneDeep(Parcel));
	//
	try
	{
		ScopeProxy.setState(adjustedState);
	}
	catch(event)
	{
		console.warn("::react-dollyzoom:problem::updateState:", event);
	}
}
function watch(Testfunction)
{
	let watchCore =
		{
			"Match":function(Target, Complete, ExpireAt)
			{
				let intervalCount
					= 0;
				let maximumAttempts
					= (ExpireAt !== undefined)
					? ExpireAt
					: 2000;
				//
				let watchInterval =
					setInterval(function()
					{
						if(Testfunction() === Target)
						{
							Complete();
							//
							clearInterval(watchInterval);
						}
						if(intervalCount >= maximumAttempts)
						{
							console.warn("react-dollyzoom.js::watch::exceeded watch limit timeout::action halted.")
							//
							clearInterval(watchInterval);
						}
						intervalCount++;
					},
					1);
				//
			}
		}
	//
	return watchCore;
}
//
//*************************
//*************************
// Exports
//
export default class Dollyzoom extends Component
{
	//*************************
	//*************************
	// Standard Methods
	//
	constructor(props)
	{
	    super(props);
	}
	getChildContext()
	{
		// empty
	}
	getInitialState()
	{
		return({});
	}
	componentWillMount()
	{
		// empty
	}
	componentWillUnmount()
	{
		// empty
	}
	componentDidMount()
	{
		let scopeProxy
			= this;
		//
		updateState(scopeProxy,
		{
			"Ready":false,
			"Panel":
			{
				"Classname":this.props.className
			},
			"Portal":
			{
				"Distort":
				{
					"Depth":this.props.Portal.Distort.Depth,
					"Perspective":this.props.Portal.Distort.Perspective,
					"Blurfactor":this.props.Portal.Distort.Blurfactor,
					"Fade":this.props.Portal.Distort.Fade,
					"Zoom":this.props.Portal.Distort.Zoom
				},
				"Morph":
				{
					"Apply":
					{
						"Easing":this.props.Portal.Morph.Apply.Easing,
						"Duration":this.props.Portal.Morph.Apply.Duration
					},
					"Restore":
					{
						"Easing":this.props.Portal.Morph.Restore.Easing,
						"Duration":this.props.Portal.Morph.Restore.Duration
					}
				},
				"Profile":
				{
					"runOnMount":false
				},
				"Style":
				{
					"display":"inline-block",
					"position":"relative",
					"width":"100%"
				},
				"Ready":this.props.Ready,
				"Change":this.props.Change,
				"Complete":this.props.Complete
			},
			"Elements":
			{
				"Style":this.props.Panel.Style,
				"Classname":this.props.Panel.Classname
			}
		});
	}
	componentWillUpdate()
	{
		// empty
	}
	componentDidUpdate()
	{
		let scopeProxy
			= this;
		//
		window.requestAnimationFrame(function()
		{
			if(scopeProxy.state !== undefined
			&& scopeProxy.state.Ready === false)
			{
				updateState(scopeProxy,
				{
					"Ready":true
				});
				scopeProxy.renderDescendents();
			}
		});
	}
	render()
	{
		let scopeProxy
			= this;
		let dollyzoompanelClassname
			= _.has(this, "state.Panel.Classname")
			? this.state.Panel.Classname
			: null;
		let dollyzoomportalStyle
			= _.has(this, "state.Portal.Style")
			? this.state.Portal.Style
			: null;
		let dollyzoomelementsStyle
			= _.has(this, "state.Elements.Style")
			? this.state.Elements.Style
			: null;
		let dollyzoomelementsClassname
			= _.has(this, "state.Elements.Classname")
			? this.state.Elements.Classname
			: null;
		let currentTargetSelector
			= _.has(this, "state.Target.Selector")
			? this.state.Target.Selector
			: null;
		let dollyzoomsurrogateDisplay
			= (currentTargetSelector !== null
			&& currentTargetSelector !== undefined)
			? "inline-block"
			: "none";
		//
		let dollyzoomsurrogateStyle =
			{
				"display":dollyzoomsurrogateDisplay,
				"position":"absolute",
				"top":"0",
				"left":"0",
				"width":"100%"
			}
		//
		let portalmorphProfileOnmount =
			{
				"runOnMount":false
			}
		//
		let portalmorphStyle =
			{
				"display":"block",
				"position":"absolute",
				"visibility":"hidden",
				"opacity":"0",
				"top":"0",
				"left":"0",
				"width":"0",
				"height":"0"
			}
		//
		let dollyzoomchildrenStyle =
			{
				"display":"none",
				"position":"absolute"
			}
		//
		let portalmorphProfile
			= _.has(this, "state.Portal.Profile")
			? this.state.Portal.Profile
			: portalmorphProfileOnmount;
		//
		return(
			<div id="dollyzoom-panel-container" ref="dollyzoompanel" className={dollyzoompanelClassname}>
				<div id="dollyzoom-elements-containter" ref="dollyzoomelements" style={dollyzoomelementsStyle} className={dollyzoomelementsClassname}>
					<div id="dollyzoom-portal-container" ref="dollyzoomportal" style={dollyzoomportalStyle}></div>
					<div id="dollyzoom-surrogate-container" ref="dollyzoomsurrogate" style={dollyzoomsurrogateStyle}></div>
					<div id="dollyzoom-children-container" ref="dollyzoomchildren" style={dollyzoomchildrenStyle}>
						{this.props.children}
					</div>
				</div>
				<VelocityComponent {...portalmorphProfile}>
					<div id="portal-morph-container" ref="portalmorph" style={portalmorphStyle}></div>
				</VelocityComponent>
			</div>
		);
	}
	//*************************
	//*************************
	// Specialized Methods
	//
	setListeners()
	{
		let scopeProxy
			= this;
		//
	}
	renderDescendents()
	{
		let scopeProxy
			= this;
		//
		watch(function()
		{
			return(typeof scopeProxy.state);
		}).
		Match("object", function()
		{
			let hostId
				= scopeProxy.props.Host.Id;
			let portalSelectorPath
				= "#".concat(hostId, " #dollyzoom-portal-container");
			let surrogateSelectorPath
				= "#".concat(hostId, " #dollyzoom-surrogate-container");
			let childrenSelectorPath
				= "#".concat(hostId, " #dollyzoom-children-container");
			let portalTargetnode
				= $(portalSelectorPath)[0];
			let surrogateTargetnode
				= $(surrogateSelectorPath)[0];
			//
			// ********************
			// ********************
			// nonflux-pattern
			// Use jQuery to perform the deep cloning in conjunction with assigning
			// the event listeners attached to the content of the dollyzoom elements
			// container. Attaching event listeners using jQuery allows jQuery to
			// easily deep clone (with listeners) the elements.
			let sourceclonePortal
				= $(childrenSelectorPath).children(0).clone(true, true)[0];
			let sourcecloneSurrogate
				= $(childrenSelectorPath).children(0).clone(true, true)[0];
			// ********************
			// ********************
			portalTargetnode.appendChild(sourceclonePortal);
			surrogateTargetnode.appendChild(sourcecloneSurrogate);
			//
			window.requestAnimationFrame(function()
			{
				scopeProxy.state.Portal.Ready(
				{
					"children":scopeProxy.props.children
				});
			});
		});
	}
	onChange(Parcel)
	{
		// empty
	}
	dollyzoomApply(Parcel)
	{
		let scopeProxy
			= this;
		let targetId
			= Parcel.Targetid;
		let onComplete
			= Parcel.Complete;
		let hostId
			= this.props.Host.Id;
		let targetSelector
			= "#".concat(targetId);
		let currentTargetSelector
			= _.has(this, "state.Target.Selector")
			? this.state.Target.Selector
			: undefined;
		let targetSelectorPath
			= "#".concat(hostId, " #dollyzoom-surrogate-container ", targetSelector);
		let portalRef
			= this.refs.dollyzoomportal;
		let surrogateRef
			= this.refs.dollyzoomsurrogate;
		let portalChildelement // get the portal child
			= portalRef.firstChild;
		let surrogateChildelement // get the descendents child
			= surrogateRef.firstChild;
		let portalChildelementContent // get the targetElement from within the portal child
			= portalChildelement.querySelector(targetSelector);
		let surrogateChildelementContent // get the targetElement from within the descendents child
			= surrogateChildelement.querySelector(targetSelector);
		let initialChildelementScale
			= 1;
		let morphEasing
			= this.state.Portal.Morph.Apply.Easing;
		let morphDuration
			= this.state.Portal.Morph.Apply.Duration;
		let distortDepth
			= this.state.Portal.Distort.Depth;
		let distortDepthUnit
			= distortDepth.match(/([A-Z,a-z])\w+/g)[0];
		let distortBlurfactor
			= this.state.Portal.Distort.Blurfactor;
		let distortBlurUnit
			= distortBlurfactor.match(/([A-Z,a-z])\w+/g)[0];
		let distortPerspective
			= this.state.Portal.Distort.Perspective;
		let distortFade
			= this.state.Portal.Distort.Fade;
		let distortZoom
			= this.state.Portal.Distort.Zoom;
		//
		let portalProfile =
			{
				"Profile":
				{
					"duration":morphDuration,
					"easing":morphEasing,
					"runOnMount":false,
					"animation":
					{
						"opacity":1
					},
					"progress":function(elements, complete, remaining, start, tweenValue)
					{
						// http://velocityjs.org/
						// The value of tweenValue is being reported as null for
						// unknown reasons. In order to tween the rotation according
						// to the easing, the actual value of the opacity must be
						// used as it tweens from zero to one. Additionally, at the
						// completion of the tween, the value of the opacity is set
						// back to zero by Velocity. This must be avoided so that the
						// rotation of the sections does not revert to its original
						// rotation value.
						//
						let progressValue
							= (elements[0].style.opacity > 0)
							? elements[0].style.opacity
							: 1;
						let translateValue
							= (parseInt(distortDepth) * progressValue).toString().concat(distortDepthUnit);
						let blurValue
							= (Math.abs(parseInt(distortDepth)) * progressValue * parseFloat(distortBlurfactor)).toString().concat(distortBlurUnit);
						let opacityValue
							= 1
							- (1 - distortFade) * progressValue;
						let grayscaleValue
							= ((1 - distortFade) * progressValue * 100).toString().concat("%");
						let zoomValue
							= (parseFloat(distortZoom) - parseFloat(initialChildelementScale)) * progressValue
							+ parseFloat(initialChildelementScale);
						let transformValue
							= "translateZ(".concat(translateValue, ")");
						//
						updateState(scopeProxy,
						{
							"Portal":
							{
								"Style":
								{
									"display":"inline-block",
									"position":"relative",
									"transform":transformValue,
									"filter":"blur(".concat(blurValue, ") grayscale(", grayscaleValue, ")"),
									"opacity":opacityValue
								}
							}
						});
						Object.assign(surrogateChildelementContent.style,
						{
							"transform":"scale(".concat(zoomValue.toString(), ")")
						});
						scopeProxy.state.Portal.Change(
						{
							"Style":
							{
								"transform":transformValue,
								"filter":"blur(".concat(blurValue, ") grayscale(", grayscaleValue, ")"),
								"opacity":opacityValue
							},
							"Target":
							{
								"Selector":targetSelector,
								"transform":"scale(".concat(zoomValue.toString(), ")")
							}
						});
					},
					"complete":function(event)
					{
						scopeProxy.state.Portal.Complete(
						{
							"Action":"dollyzoomApply",
							"Target":targetSelector
						});
						onComplete(document.querySelector(targetSelectorPath));
					}
				}
			}
		//
		if(currentTargetSelector !== null
		&& currentTargetSelector !== undefined)
		{
			this.dollyzoomRestore(currentTargetSelector.split("#")[1]);
		}
		else
		{
			Object.assign(portalChildelementContent.style,
			{
				"visibility":"hidden" // hide targetElement within the dollyzoomPortal element
			});
			Object.assign(surrogateChildelement.style,
			{
				"visibility":"hidden" // hides all child elements of the dollyzoomDescendents element
			});
			Object.assign(surrogateChildelementContent.style,
			{
				"visibility":"visible" // forces targetElement to be visible within the dollyzoomDescendents element
			});
			updateState(scopeProxy,
			{
				"Portal":portalProfile,
				"Elements":
				{
					"Style":
					{
						"display":"inline-block",
						"position":"relative",
						"transform-style":"preserve-3d",
						"perspective":distortPerspective
					}
				},
				"Target":
				{
					"Selector":targetSelector
				}
			});
		}
	}
	dollyzoomRestore()
	{
		let scopeProxy
			= this;
		let hostId
			= this.props.Host.Id;
		let targetSelector
			= this.state.Target.Selector;
		let currentTargetSelector
			= this.state.Target.Selector;
		let targetSelectorPath
			= "#".concat(hostId, " #dollyzoom-surrogate-container ", targetSelector);
		let portalRef
			= this.refs.dollyzoomportal;
		let surrogateRef
			= this.refs.dollyzoomsurrogate;
		let portalChildelement // get the portal child
			= portalRef.firstChild;
		let surrogateChildelement // get the descendents child
			= surrogateRef.firstChild;
		let portalChildelementContent // get the targetElement from within the portal child
			= portalChildelement.querySelector(targetSelectorPath);
		let surrogateChildelementContent // get the targetElement from within the descendents child
			= surrogateChildelement.querySelector(targetSelectorPath);
		let initialChildelementScale
			= 1;
		let morphEasing
			= this.state.Portal.Morph.Restore.Easing;
		let morphDuration
			= this.state.Portal.Morph.Restore.Duration;
		let distortDepth
			= this.state.Portal.Distort.Depth;
		let distortDepthUnit
			= distortDepth.match(/([A-Z,a-z])\w+/g)[0];
		let distortBlurfactor
			= this.state.Portal.Distort.Blurfactor;
		let distortBlurUnit
			= distortBlurfactor.match(/([A-Z,a-z])\w+/g)[0];
		let distortPerspective
			= this.state.Portal.Distort.Perspective;
		let distortFade
			= this.state.Portal.Distort.Fade;
		let distortZoom
			= this.state.Portal.Distort.Zoom;
		//
		let portalProfile =
			{
				"Profile":
				{
					"duration":morphDuration,
					"easing":morphEasing,
					"runOnMount":false,
					"animation":
					{
						"opacity":0
					},
					"progress":function(elements, complete, remaining, start, tweenValue)
					{
						// http://velocityjs.org/
						// The value of tweenValue is being reported as null for
						// unknown reasons. In order to tween the rotation according
						// to the easing, the actual value of the opacity must be
						// used as it tweens from zero to one. Additionally, at the
						// completion of the tween, the value of the opacity is set
						// back to zero by Velocity. This must be avoided so that the
						// rotation of the sections does not revert to its original
						// rotation value.
						//
						let progressValue
							= (elements[0].style.opacity > 0)
							? elements[0].style.opacity
							: 0;
						let translateValue
							= (parseInt(distortDepth) * progressValue).toString().concat(distortDepthUnit);
						let blurValue
							= (Math.abs(parseInt(distortDepth)) * progressValue * parseFloat(distortBlurfactor)).toString().concat(distortBlurUnit);
						let opacityValue
							= 1
							- (1 - distortFade) * progressValue;
						let grayscaleValue
							= ((1 - distortFade) * progressValue * 100).toString().concat("%");
						let zoomValue
							= (parseFloat(distortZoom) - parseFloat(initialChildelementScale)) * progressValue
							+ parseFloat(initialChildelementScale);
						let transformValue
							= "translateZ(".concat(translateValue, ")");
						//
						updateState(scopeProxy,
						{
							"Portal":
							{
								"Style":
								{
									"display":"inline-block",
									"position":"relative",
									"transform":transformValue,
									"filter":"blur(".concat(blurValue, ") grayscale(", grayscaleValue, ")"),
									"opacity":opacityValue
								}
							}
						});
						Object.assign(surrogateChildelementContent.style,
						{
							"transform":"scale(".concat(zoomValue.toString(), ")")
						});
						scopeProxy.state.Portal.Change(
						{
							"Style":
							{
								"transform":transformValue,
								"filter":"blur(".concat(blurValue, ") grayscale(", grayscaleValue, ")"),
								"opacity":opacityValue
							},
							"Target":
							{
								"Selector":targetSelector,
								"transform":"scale(".concat(zoomValue.toString(), ")")
							}
						});
					},
					"complete":function(event)
					{
						let hostId
							= scopeProxy.props.Host.Id;
						let portalSelectorPath
							= "#".concat(hostId, " #dollyzoom-portal-container");
						let surrogateSelectorPath
							= "#".concat(hostId, " #dollyzoom-surrogate-container");
						// ********************
						// ********************
						// nonflux-pattern
						// Use jQuery to perform the deep cloning in conjunction with assigning
						// the event listeners attached to the content of the dollyzoom elements
						// container. Attaching event listeners using jQuery allows jQuery to
						// easily deep clone (with listeners) the elements.
						let surrogateContent
							= $(surrogateSelectorPath).clone(true, true);
						//
						$(portalSelectorPath).html($(surrogateContent).children());
						//
						$(portalSelectorPath).children(0).css("visibility", "inherit");
						// ********************
						// ********************
						//
						Object.assign(surrogateChildelementContent.style,
						{
							"visibility":"inherit" // reset visibility to default flow
						});
						updateState(scopeProxy,
						{
							"Target":
							{
								"Selector":null
							}
						});
						scopeProxy.state.Portal.Complete(
						{
							"Action":"dollyzoomRestore",
							"Target":targetSelector
						});
					}
				}
			}
		//
		if(targetSelector !== null)
		{
			updateState(scopeProxy,
			{
				"Portal":portalProfile,
				"Elements":
				{
					"Style":
					{
						"display":"inline-block",
						"position":"relative",
						"transform-style":"preserve-3d",
						"perspective":distortPerspective
					}
				}
			});
		}
		else
		{
			console.warn("react-dollyzoom.js::dollyzoomRestort::dollyzoomRestore called before dollyzoomApply::action halted.");
		}
	}
	//*************************
	//*************************
	// Assignments
	//
	static contextTypes =
		{
			// empty
		}
	//
}