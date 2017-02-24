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
	// props
	//
	// props.Portal.Distort.Depth
	// props.Portal.Distort.Perspective
	// props.Portal.Distort.Blurfactor
	// props.Portal.Distort.Fade
	// props.Portal.Distort.Zoom
	//
	// props.Portal.Morph.Apply.Easing
	// props.Portal.Morph.Apply.Duration
	//
	// props.Portal.Morph.Restore.Easing
	// props.Portal.Morph.Restore.Duration
	//
	// props.Ready
	//
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
			"Portal":
			{
				"Subject":null,
				"Velocity":
				{
					"Profile":
					{
						"runOnMount":false
					}
				}
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
				scopeProxy.props.Ready(scopeProxy.props.children);
			}
		});
	}
	render()
	{
		let scopeProxy
			= this;
		let dollyzoomportalClassname
			= this.props.className;
		let currentTargetSelector
			= _.has(this, "state.Target.Selector")
			? this.state.Target.Selector
			: null;
		//
		let dollyzoomportalStyle =
			{
				"transform-style":"preserve-3d",
				"perspective":"1000px"
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
		let portalmorphProfile
			= _.has(this, "state.Portal.Velocity.Profile")
			? this.state.Portal.Velocity.Profile
			: portalmorphProfileOnmount;
		//
		let domParcel =
			<div id="dollyzoom-portal-container" ref="dollyzoomportal" className={dollyzoomportalClassname} style={dollyzoomportalStyle}>
				{this.props.children}
				<VelocityComponent {...portalmorphProfile}>
					<div id="portal-morph-container" ref="portalmorph" style={portalmorphStyle}></div>
				</VelocityComponent>
			</div>
		//
		return(domParcel);
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
	dollyzoomApply(applyParcel)
	{
		let scopeProxy
			= this;
		let subjectId
			= applyParcel.Subject;
		let currentSubject
			= scopeProxy.state.Portal.Subject;
		let completeCallback
			= applyParcel.Complete;
		let distortDepth
			= this.props.Portal.Distort.Depth;
		let distortBlurfactor
			= this.props.Portal.Distort.Blurfactor;
		let distortFade
			= this.props.Portal.Distort.Fade;
		let distortZoom
			= this.props.Portal.Distort.Zoom;
		let morphEasing
			= this.props.Portal.Morph.Apply.Easing;
		let morphDuration
			= this.props.Portal.Morph.Apply.Duration;
		let distortDepthUnit
			= distortDepth.match(/([A-Z,a-z])\w+/g)[0];
		let distortBlurUnit
			= distortBlurfactor.match(/([A-Z,a-z])\w+/g)[0];
		let initialChildelementScale
			= 1;
		let totalElements
			= this.props.children.length;
		//
		let childElements =
			this.props.children.map((childItem)=>
			{
				let childId
					= childItem.props.id;
				let childElement
					= document.getElementById(childId);
				//
				return(childElement);
			});
		//
		let portalProfile =
			{
				"duration":morphDuration,
				"easing":morphEasing,
				"runOnMount":false,
				"animation":
				{
					"opacity":1
				},
				"progress":(elements, complete, remaining, start, tweenValue)=>
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
						? parseFloat(elements[0].style.opacity)
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
					for(let elementCount = 0; elementCount < totalElements; elementCount++)
					{
						if(childElements[elementCount].id !== subjectId)
						{
							Object.assign(childElements[elementCount].style,
							{
								"opacity":opacityValue,
								"filter":"blur(".concat(blurValue, ") grayscale(", grayscaleValue, ")"),
								"transform":transformValue
							});
						}
						else
						{
							Object.assign(childElements[elementCount].style,
							{
								"transform":"scale(".concat(zoomValue.toString())
							});
						}
					}
				},
				"complete":(event)=>
				{
					completeCallback(subjectId);
				}
			}
		//
		if(currentSubject === null)
		{
			updateState(scopeProxy,
			{
				"Portal":
				{
					"Subject":subjectId,
					"Velocity":
					{
						"Profile":portalProfile
					}
				}
			});
		}
		else
		{
			scopeProxy.dollyzoomRestore((subjectId)=>
			{
				// empty
			});
		}
	}
	dollyzoomRestore(restoreCallback)
	{
		let scopeProxy
			= this;
		let subjectId
			= scopeProxy.state.Portal.Subject;
		let distortDepth
			= this.props.Portal.Distort.Depth;
		let distortBlurfactor
			= this.props.Portal.Distort.Blurfactor;
		let distortFade
			= this.props.Portal.Distort.Fade;
		let distortZoom
			= this.props.Portal.Distort.Zoom;
		let morphEasing
			= this.props.Portal.Morph.Apply.Easing;
		let morphDuration
			= this.props.Portal.Morph.Apply.Duration;
		let distortDepthUnit
			= distortDepth.match(/([A-Z,a-z])\w+/g)[0];
		let distortBlurUnit
			= distortBlurfactor.match(/([A-Z,a-z])\w+/g)[0];
		let initialChildelementScale
			= 1;
		let totalElements
			= this.props.children.length;
		//
		let childElements =
			this.props.children.map((childItem)=>
			{
				let childId
					= childItem.props.id;
				let childElement
					= document.getElementById(childId);
				//
				return(childElement);
			});
		//
		let portalProfile =
			{
				"duration":morphDuration,
				"easing":morphEasing,
				"runOnMount":false,
				"animation":
				{
					"opacity":0
				},
				"progress":(elements, complete, remaining, start, tweenValue)=>
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
						? parseFloat(elements[0].style.opacity)
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
					for(let elementCount = 0; elementCount < totalElements; elementCount++)
					{
						if(childElements[elementCount].id !== subjectId)
						{
							Object.assign(childElements[elementCount].style,
							{
								"opacity":opacityValue,
								"filter":"blur(".concat(blurValue, ") grayscale(", grayscaleValue, ")"),
								"transform":transformValue
							});
						}
						else
						{
							Object.assign(childElements[elementCount].style,
							{
								"transform":"scale(".concat(zoomValue.toString())
							});
						}
					}
				},
				"complete":(event)=>
				{
					restoreCallback(subjectId);
				}
			}
		//
		updateState(scopeProxy,
		{
			"Portal":
			{
				"Subject":null,
				"Velocity":
				{
					"Profile":portalProfile
				}
			}
		});
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