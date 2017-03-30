import React, {Component, PropTypes} from "react";
import ReactDOM from "react-dom";
import {connect} from "react-redux";
import {Panel, Button} from "react-bootstrap";
import Highlight from "react-syntax-highlight";
import Formfields from "react-form-fields";
import $ from "jquery";
import Dollyzoom from "react-dollyzoom-effect";
//
import {fetchDollyzoomHtml} from "../actions/actions";
import {fetchDollyzoomPropsexampleJs} from "../actions/actions";
import {fetchDollyzoomMethodsexampleJs} from "../actions/actions";
import {fetchDollyzoomPropsDemoexampleJson} from "../actions/actions";
import {fetchDollyzoomCssDemoexampleCss} from "../actions/actions";
import {fetchDollyzoomDeployexampleHtml} from "../actions/actions";
import BackgroundCanvas from "../components/background-canvas";
import {updateState} from "../toolbox/toolbox";
import ReactGA from "react-ga";
//
class DollyzoomLanding extends Component
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
		this.props.fetchDollyzoomHtml();
		this.props.fetchDollyzoomPropsexampleJs();
		this.props.fetchDollyzoomMethodsexampleJs();
		this.props.fetchDollyzoomPropsDemoexampleJson();
		this.props.fetchDollyzoomCssDemoexampleCss();
		this.props.fetchDollyzoomDeployexampleHtml();
	}
	componentWillUnmount()
	{
		// empty
	}
	componentDidMount()
	{
		let scopeProxy
			= this;
		let dollyzoomRef
			= this.refs.reactdollyzoom;
		let formfieldHostleftRef
			= this.refs.formfillhostleft;
		let setViewLoaded
			= this.context.setViewLoaded;
		let setLayoutMode
			= this.context.setLayoutMode;
		let updateNavigationState
			= this.context.updateNavigationState;
		let navigationSection
			= 0;
		//
		updateState(scopeProxy,
		{
			"Forminput":
			{
				"Selected":
				{
					"Host":
					{
						"Id":null
					},
					"Element":
					{
						"Id":null
					}
				}
			},
			"Navcluster":
			{
				"Hardtop":
				{
					"Profile":
					{
						"className":"dollyzoom-section-button",
						"disabled":false
					}
				},
				"Convertible":
				{
					"Profile":
					{
						"className":"dollyzoom-section-button",
						"disabled":false
					}
				},
				"Reset":
				{
					"Profile":
					{
						"className":"dollyzoom-section-button",
						"disabled":true
					}
				}
			}
		});
		window.requestAnimationFrame(()=>
		{
			// Updating the section index this way lets the
			// state of the nagigation cluster fully initialize
			// before the activeKey value is updated. This is
			// necessary for it to be possible to navigate
			// back to the wares section from within a component
			// landing page when the component landing page is
			// directly accessed via the url bar in the browser.
			updateNavigationState(navigationSection);
		});
		let setviewTimeout =
			setTimeout(function()
			{
				setViewLoaded(true);
				setLayoutMode("full");
			},
			500);
		//
	}
	componentWillUpdate()
	{
		// empty
	}
	componentDidUpdate()
	{
		window.requestAnimationFrame(function()
		{
			// empty
		});
	}
	render()
	{
		let scopeProxy
			= this;
		let dollyzoomHtml
			= scopeProxy.props.html;
		let jsonReady
			= true;
		let profileReady
			= true;
		let dollyzoomPropsDemoExample
			= (scopeProxy.props.dollyzoomPropsexampleJs !== undefined
			&& scopeProxy.props.dollyzoomPropsexampleJs !== null)
			? scopeProxy.props.dollyzoomPropsexampleJs
			: "loading...";
		let dollyzoomMethodsDemoExample
			= (scopeProxy.props.dollyzoomMethodsexampleJs !== undefined
			&& scopeProxy.props.dollyzoomMethodsexampleJs !== null)
			? scopeProxy.props.dollyzoomMethodsexampleJs
			: "loading...";
		let dollyzoomPropsExample
			= (scopeProxy.props.dollyzoomPropsDemoexampleJson !== undefined
			&& scopeProxy.props.dollyzoomPropsDemoexampleJson !== null)
			? scopeProxy.props.dollyzoomPropsDemoexampleJson
			: "loading...";
		let dollyzoomCssDemoExample
			= (scopeProxy.props.dollyzoomCssDemoexampleCss !== undefined
			&& scopeProxy.props.dollyzoomCssDemoexampleCss !== null)
			? scopeProxy.props.dollyzoomCssDemoexampleCss
			: "loading...";
		let dollyzoomDeployExample
			= (scopeProxy.props.dollyzoomDeployexampleHtml !== undefined
			&& scopeProxy.props.dollyzoomDeployexampleHtml !== null)
			? scopeProxy.props.dollyzoomDeployexampleHtml
			: "loading...";
		//
		let carshowcaseProfile =
			{
				"Portal":
				{
					"Distort":
					{
						"Depth":"-40px",
						"Perspective":"2000px",
						"Blurfactor":".2px",
						"Fade":".7",
						"Zoom":"1.1"
					},
					"Morph":
					{
						"Apply":
						{
							"Easing":"easeInQuart",
							"Duration":"300"
						},
						"Restore":
						{
							"Easing":"easeoOutQuart",
							"Duration":"300"
						}
					}
				},
				"Ready":function(event)
				{
					//console.log("----- Ready:", event);
				}
			}
		//
		let formfillProfile =
			{
				"Portal":
				{
					"Distort":
					{
						"Depth":"-40px",
						"Perspective":"2000px",
						"Blurfactor":".2px",
						"Fade":".7",
						"Zoom":"1.1"
					},
					"Morph":
					{
						"Apply":
						{
							"Easing":"easeInQuart",
							"Duration":"300"
						},
						"Restore":
						{
							"Easing":"easeoOutQuart",
							"Duration":"300"
						}
					}
				},
				"Ready":function(event)
				{
					//console.log("----- Ready:", event);
				},
				"Change":function(event)
				{
					//console.log("----- Change:", event);
				},
				"Complete":function(event)
				{
					//console.log("----- Complete:", event);
				}
			}
		//
		let carshowcaseCarSelected =
			function(dollyzoomChildId)
			{
				scopeProxy.dollyzoomApply(
				{
					"Refvalue":"carshowcasereactdollyzoom",
					"Targetid":dollyzoomChildId,
					"Complete":function(targetElement)
					{
						// empty
					}
				});
				updateState(scopeProxy,
				{
					"Navcluster":
					{
						"Hardtop":
						{
							"Profile":
							{
								"className":"dollyzoom-section-button",
								"disabled":true
							}
						},
						"Convertible":
						{
							"Profile":
							{
								"className":"dollyzoom-section-button",
								"disabled":true
							}
						},
						"Reset":
						{
							"Profile":
							{
								"className":"dollyzoom-section-button",
								"disabled":false
							}
						}
					}
				});
			}
		//
		let dollyzoomReset =
			function()
			{
				scopeProxy.dollyzoomRestore(
				{
					"Refvalue":"carshowcasereactdollyzoom",
					"Complete":function(event)
					{
						console.log("----- restore:", event);
					}
				});
				updateState(scopeProxy,
				{
					"Navcluster":
					{
						"Hardtop":
						{
							"Profile":
							{
								"className":"dollyzoom-section-button",
								"disabled":false
							}
						},
						"Convertible":
						{
							"Profile":
							{
								"className":"dollyzoom-section-button",
								"disabled":false
							}
						},
						"Reset":
						{
							"Profile":
							{
								"className":"dollyzoom-section-button",
								"disabled":true
							}
						}
					}
				});
			}
		//
		let backgroundcanvasProfile =
			{
				"Background":
				{
					"Color":"rgba(245,245,255,1)"
				},
				"Watermark":
				{
					"Name":"dollyzoom",
					"Image":"anvil-watermark-filtered_480x363.png"
				}
			}
		//
		let firstnameInputProfile =
			{
				"tag":"input",
				"validation":"email",
				"errorMsg":"alphanumeric only",
				"required":false,
				"attributes":
				{
					"type":"text",
					"placeholder":"first name",
					"name":"firstname-input",
					"id":"firstname-input-field",
					"className":"formfield-input"
				},
				"onFocus":function(event)
				{
					scopeProxy.inputfieldOnFocus(
					{
						"Input":
						{
							"Id":"firstname-input-field"
						},
						"Child":
						{
							"Id":"formfill-hostleft-container"
						}
					});
				},
				"onValidate":function(event)
				{
					// empty
				}
			}
		//
		let lastnameInputProfile =
			{
				"tag":"input",
				"validation":"alphanumeric",
				"errorMsg":"alphanumeric only",
				"required":false,
				"attributes":
				{
					"type":"text",
					"placeholder":"last name",
					"name":"lastname-input",
					"id":"lastname-input-field",
					"className":"formfield-input"
				},
				"onFocus":function(event)
				{
					scopeProxy.inputfieldOnFocus(
					{
						"Input":
						{
							"Id":"lastname-input-field"
						},
						"Child":
						{
							"Id":"formfill-hostleft-container"
						}
					});
				},
				"onValidate":function(event)
				{
					// empty
				}
			}
		//
		let occupationInputProfile =
			{
				"tag":"input",
				"validation":"email",
				"errorMsg":"alphanumeric only",
				"required":false,
				"attributes":
				{
					"type":"text",
					"placeholder":"occupation",
					"name":"occupation-input",
					"id":"occupation-input-field",
					"className":"formfield-input"
				},
				"onFocus":function(event)
				{
					scopeProxy.inputfieldOnFocus(
					{
						"Input":
						{
							"Id":"occupation-input-field"
						},
						"Child":
						{
							"Id":"formfill-hostright-container"
						}
					});
				},
				"onValidate":function(event)
				{
					// empty
				}
			}
		//
		let descriptionInputProfile =
			{
				"tag":"textarea",
				"validation":"alphanumeric",
				"errorMsg":"alphanumeric only",
				"required":false,
				"attributes":
				{
					"type":"text",
					"placeholder":"description",
					"name":"description-input",
					"id":"description-input-field",
					"className":"formfield-input formfield-input-area"
				},
				"onFocus":function(event)
				{
					scopeProxy.inputfieldOnFocus(
					{
						"Input":
						{
							"Id":"description-input-field"
						},
						"Child":
						{
							"Id":"formfill-hostright-container"
						}
					});
				},
				"onValidate":function(event)
				{
					// empty
				}
			}
		//
		let hardtopbuttonProfileOnMount =
			{
				"className":"dollyzoom-section-button",
				"disabled":false
			}
		//
		let convertiblebuttonProfileOnMount =
			{
				"className":"dollyzoom-section-button",
				"disabled":false
			}
		//
		let resetbuttonProfileOnMount =
			{
				"className":"dollyzoom-section-button",
				"disabled":true
			}
		//
		let hardtopbuttonProfile
			= _.has(scopeProxy, "state.Navcluster.Hardtop.Profile")
			? scopeProxy.state.Navcluster.Hardtop.Profile
			: hardtopbuttonProfileOnMount;
		let convertiblebuttonProfile
			= _.has(scopeProxy, "state.Navcluster.Convertible.Profile")
			? scopeProxy.state.Navcluster.Convertible.Profile
			: convertiblebuttonProfileOnMount;
		let resetbuttonProfile
			= _.has(scopeProxy, "state.Navcluster.Reset.Profile")
			? scopeProxy.state.Navcluster.Reset.Profile
			: resetbuttonProfileOnMount;
		//
		if(jsonReady === true
		&& profileReady === true)
		{
			return(
				<div id="wares-landing-container" ref="wareslanding" className="wares-landing">
					<div id="wares-landing-content-conainer" ref="wareslandingcontent" className="wares-landing-content">
						<div id="ware-introduction-container" ref="wareintroduction" className="ware-introduction">
							<div id="ware-landing-html-container" ref="warelandinghtml" dangerouslySetInnerHTML={{"__html":dollyzoomHtml}} className="ware-landing-html"/>
						</div>
						<div id="ware-properties-detail-container" className="ware-properties-detail">
							<Panel collapsible defaultExpanded={false} header="Properties (props)" className="detail-heading">
								<Highlight lang="json" value={dollyzoomPropsExample}/>
							</Panel>
						</div>
						<div id="ware-properties-detail-container" className="ware-properties-detail">
							<Panel collapsible defaultExpanded={false} header="Methods" className="detail-heading">
								<Highlight lang="js" value={"let reactdollyzoomRef = this.refs.reactdollyzoom;"}/>
								<hr/>
								<Highlight lang="js" value={dollyzoomMethodsDemoExample}/>
							</Panel>
						</div>
						<div id="ware-properties-detail-container" className="ware-properties-detail">
							<Panel collapsible defaultExpanded={false} header="Demo Properties (props)" className="detail-heading">
								<Highlight lang="js" value={dollyzoomPropsDemoExample}/>
							</Panel>
						</div>
						<div id="ware-properties-detail-container" className="ware-properties-detail">
							<Panel collapsible defaultExpanded={false} header="Demo Styles (css)" className="detail-heading">
								<Highlight lang="css" value={dollyzoomCssDemoExample}/>
							</Panel>
						</div>
						<div id="ware-properties-detail-container" className="ware-properties-detail">
							<Panel collapsible defaultExpanded={true} header="Deploy" className="detail-heading">
								<Highlight lang="jsx" value={"npm install react-dollyzoom-effect -s"}/>
								<hr/>
								<Highlight lang="js" value={"import Dollyzoom from 'react-dollyzoom-effect';"}/>
								<hr/>
								<Highlight lang="html" value={dollyzoomDeployExample}/>
							</Panel>
						</div>
						<div id="dollyzoom-showcase-container" ref="dollyzoomshowcase" className="dollyzoom-showcase">
							<div id="dollyzoom-heading-container" ref="dollyzoomheading" className="dollyzoom-heading">
								<div id="dollyzoom-heading-headline-container" ref="dollyzoomheadingheadline" className="dollyzoom-heading-headline">
									Demo
								</div>
							</div>
							<hr/>
							<div id="demo-title-container" className="demo-title">Static Content</div>
							<div id="carshowcase-dollyzoom-container">
								<div id="dollyzoom-navcluster-host-container" className="dollyzoom-navcluster-host">
									<div id="dollyzoom-navcluster-container" className="dollyzoom-navcluster carshowcase-navcluster">
										<Button {...hardtopbuttonProfile} onClick={carshowcaseCarSelected.bind(this, "redcamaro-focus-container")}>Hard Top</Button>
										<Button {...convertiblebuttonProfile} onClick={carshowcaseCarSelected.bind(this, "silvercamaro-focus-container")}>Convertible</Button>
										<Button {...resetbuttonProfile} onClick={dollyzoomReset.bind(this)}>Reset Dollyzoom</Button>
									</div>
								</div>
								<Dollyzoom ref="carshowcasereactdollyzoom" {...carshowcaseProfile} className="carshowcase-dollyzoom">
									<div id="carshowcase-wallpaper-container" className="carshowcase-wallpaper"></div>
									<div id="redcamaro-focus-container" className="redcamaro-focus"></div>
									<div id="silvercamaro-focus-container" className="silvercamaro-focus"></div>
								</Dollyzoom>
							</div>
							<hr/>
							<div id="demo-title-container" className="demo-title">Interactive Content</div>
							<div id="formfill-dollyzoom-container">
								<Dollyzoom ref="formfillreactdollyzoom" {...formfillProfile} className="formfill-dollyzoom">
									<div id="formfill-wallpaper-container" className="formfill-wallpaper" onClick={scopeProxy.dollyzoomClick.bind(this)}></div>
									<div id="formfill-hostleft-container" className="formfill-hostleft">
										<div id="formfill-cardheaderleft-container" className="formfill-cardheader formfill-cardheaderleft">
											Dollyzoom can contain any number of children. Only children (i.e. direct descendents) are able to become a target. The distort effect is applied to everything except the target element.
										</div>
										<div id="formfill-cardbodyleft-container" className="formfill-cardbodyleft">
											<Formfields {...firstnameInputProfile} className="formfield-inputfield"/>
											<Formfields {...lastnameInputProfile} className="formfield-inputfield"/>
											<div id="donebutton-host-container" className="donebutton-host">
												<Button id="done-button-component" className="done-button" onClick={scopeProxy.donebuttonClick.bind(this)}>Done</Button>
											</div>
										</div>
									</div>
									<div id="formfill-hostright-container" className="formfill-hostright">
										<div id="formfill-cardheaderright-container" className="formfill-cardheader formfill-cardheaderright">
											The target element has the ability to be scaled upon focus. Target elements are able to contain any number of children. Listeners are availble that easily manage the selection state of the Dollyzoom container.
										</div>
										<div id="formfill-cardbodyright-container" className="formfill-cardbodyright">
											<Formfields {...occupationInputProfile}/>
											<Formfields {...descriptionInputProfile}/>
										</div>
									</div>
								</Dollyzoom>
							</div>
							<hr/>
						</div>
					</div>
					<BackgroundCanvas ref="backgroundcanvas" {...backgroundcanvasProfile}/>
				</div>
			);
		}
		else
		{
			return(
				<div id="wares-landing-container" ref="wareslanding" className="wares-landing">
					"Loading Dollyzoom Content..."
				</div>
			);
		}
	}
	//*************************
	//*************************
	// Specialized Methods
	//
	dollyzoomApply(Parcel)
	{
		let scopeProxy
			= this;
		let dollyzoomRefValue
			= Parcel.Refvalue;
		let targetId
			= Parcel.Targetid;
		let onComplete
			= Parcel.Complete;
		let dollyzoomRef
			= this.refs[dollyzoomRefValue];
		//
		ReactGA.event(
		{
		  "category":"dollyzoom_action",
		  "action":"dollyzoom_click",
		  "label":"dollyzoom-apply_".concat(targetId)
		});
		dollyzoomRef.dollyzoomApply(
		{
			"Subject":targetId,
			"Complete":onComplete
		});
	}
	dollyzoomRestore(Parcel)
	{
		let scopeProxy
			= this;
		let dollyzoomRefValue
			= Parcel.Refvalue;
		let onComplete
			= Parcel.Complete;
		let dollyzoomRef
			= scopeProxy.refs[dollyzoomRefValue];
		//
		ReactGA.event(
		{
		  "category":"dollyzoom_action",
		  "action":"dollyzoom_click",
		  "label":"dollyzoom-restore"
		});
		dollyzoomRef.dollyzoomRestore(onComplete);
	}
	inputfieldOnFocus(Parcel)
	{
		let scopeProxy
			= this;
		let forminputId
			= Parcel.Input.Id;
		let dollyzoomChildId
			= Parcel.Child.Id;
		let currentlySelectedId
			= this.state.Forminput.Selected.Element.Id;
		//
		if(currentlySelectedId === null)
		{
			updateState(scopeProxy,
			{
				"Forminput":
				{
					"Selected":
					{
						"Id":forminputId,
						"Host":
						{
							"Id":dollyzoomChildId
						},
						"Element":
						{
							"Id":forminputId
						}
					}
				}
			});
			scopeProxy.dollyzoomApply(
			{
				"Refvalue":"formfillreactdollyzoom",
				"Targetid":dollyzoomChildId,
				"Complete":(targetElement)=>
				{
					// empty
				}
			});
		}
	}
	donebuttonClick(event)
	{
		let scopeProxy
			= this;
		let dollyzoomRef
			= this.refs.formfillreactdollyzoom;
		//
		updateState(scopeProxy,
		{
			"Forminput":
			{
				"Selected":
				{
					"Id":null,
					"Host":
					{
						"Id":null
					},
					"Element":
					{
						"Id":null
					}
				}
			}
		});
		dollyzoomRef.dollyzoomRestore((subjectId)=>
		{
			// empty
		});
		ReactGA.event(
		{
		  "category":"dollyzoom_action",
		  "action":"dollyzoom_click",
		  "label":"dollyzoom-blur"
		});
		event.stopPropagation();
	}
	dollyzoomClick(event)
	{
		let scopeProxy
			= this;
		let dollyzoomRef
			= this.refs.formfillreactdollyzoom;
		//
		ReactGA.event(
		{
		  "category":"dollyzoom_action",
		  "action":"dollyzoom_click",
		  "label":"dollyzoom-blur"
		});
		updateState(scopeProxy,
		{
			"Forminput":
			{
				"Selected":
				{
					"Id":null,
					"Host":
					{
						"Id":null
					},
					"Element":
					{
						"Id":null
					}
				}
			}
		});
		dollyzoomRef.dollyzoomRestore((subjectId)=>
		{
			// empty
		});
		event.stopPropagation();
	}
	//*************************
	//*************************
	// Assignments
	//
	static contextTypes =
		{
			"transitionBody":PropTypes.func,
			"updateNavigationState":PropTypes.func,
			"setViewLoaded":PropTypes.func,
			"setLayoutMode":PropTypes.func
		}
	//
}
function mapAxiosstateToReactprops(axiosState)
{
	// This function is only called when the axios
	// response updates the application state. Once
	// this function is called, the component state
	// is updated which causes the render() function
	// to execute.
	return(
	{
		// When the application state (state.posts.all) is
		// updated by the axios promise, the promise response
		// is assigned the component state this.content.posts.
		"html":axiosState.content.html,
		"dollyzoomPropsexampleJs":axiosState.content.dollyzoomPropsexampleJs,
		"dollyzoomMethodsexampleJs":axiosState.content.dollyzoomMethodsexampleJs,
		"dollyzoomPropsDemoexampleJson":axiosState.content.dollyzoomPropsDemoexampleJson,
		"dollyzoomCssDemoexampleCss":axiosState.content.dollyzoomCssDemoexampleCss,
		"dollyzoomDeployexampleHtml":axiosState.content.dollyzoomDeployexampleHtml
	});
}
export default connect(mapAxiosstateToReactprops,
{
	"fetchDollyzoomHtml":fetchDollyzoomHtml,
	"fetchDollyzoomPropsexampleJs":fetchDollyzoomPropsexampleJs,
	"fetchDollyzoomMethodsexampleJs":fetchDollyzoomMethodsexampleJs,
	"fetchDollyzoomPropsDemoexampleJson":fetchDollyzoomPropsDemoexampleJson,
	"fetchDollyzoomCssDemoexampleCss":fetchDollyzoomCssDemoexampleCss,
	"fetchDollyzoomDeployexampleHtml":fetchDollyzoomDeployexampleHtml
})(DollyzoomLanding);