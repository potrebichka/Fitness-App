// // Initialize Firebase
// var config = {
//     apiKey: "AIzaSyCVaHbBfXT7-KA06BPYenrlm4l9g5xs0F4",
//     authDomain: "fitness-plan-cfd8e.firebaseapp.com",
//     databaseURL: "https://fitness-plan-cfd8e.firebaseio.com",
//     projectId: "fitness-plan-cfd8e",
//     storageBucket: "fitness-plan-cfd8e.appspot.com",
//     messagingSenderId: "897687781140"
//   };
// firebase.initializeApp(config);

//   // Get a reference to the database service
// const database = firebase.database();

// // list and hash-table for exercises
// let exercises = [];
// let exercisesDict = {};

// //redux and react-redux
// const { createStore } = Redux;
// const { Provider, connect } = ReactRedux;

// //actions and reducer for redux store
// const ADD_EXERCISES = 'ADD EXERCISES';
// const CHANGE_WARMUP = 'CHANGE_WARMUP';
// const CHANGE_EXERCISES = 'CHANGE_EXERCISES';
// const CHANGE_COOLDOWN = 'CHANGE_COOLDOWN';

// const [DONE, ON, OFF] = ["DONE", "ON", "OFF"];

// const initialState = {
//   planInfo: [],
//   planExercises: [], 
//   planWarmUp: [],
//   planCoolDown: [],
//   progressWarmUp: OFF,
//   progressExercises: OFF,
//   progressCoolDown: OFF
// }

// const reducer = (state = initialState, action) => {
//   switch (action.type) {
//     case ADD_EXERCISES:
//       return {
//         ...state,
//         planInfo: action.newInfo,
//         planExercises: action.newExercises,
//         planWarmUp: action.newWarmUp,
//         planCoolDown: action.newCoolDown
//       };
//     case CHANGE_WARMUP:
//       return {
//         ...state,
//         progressWarmUp: action.progress
//       };
//     case CHANGE_EXERCISES:
//       return {
//         ...state,
//         progressExercises: action.progress
//       };
//     case CHANGE_COOLDOWN:
//       return {
//         ...state,
//         progressCoolDown: action.progress
//       }
//   }
//   return state
// }

// //timer
// class Timer extends React.Component {
//   constructor(props){
//     super(props);
//     this.state = {
//       currentTime: 0,
//       timeAtStart: 0,
//       isOn: false
//     }
//     this.startTimer = this.startTimer.bind(this);
//     this.stopTimer = this.stopTimer.bind(this);
//     this.resetTimer = this.resetTimer.bind(this);
//   }

//   componentDidMount() {
//     this.setState({
//       currentTime: this.props.startTime
//     });                 
//   }
  
//   startTimer() {
//     this.setState({
//       currentTime: this.state.currentTime, 
//       timeAtStart: Math.round(Date.now()/1000) + this.state.currentTime,
//       isOn: true
//     });
//     this.timer = setInterval(() => this.setState({
//       currentTime: - Math.round(Date.now()/1000) + this.state.timeAtStart
//     }), 1000);
//   }
  
//   stopTimer() {
//     this.setState({isOn: false})
//     clearInterval(this.timer);
//   }
  
//   resetTimer() {
//     this.setState({time: this.props.startTime});
//   }
  
    
//   render() {
//     /*start timer*/
//     if (this.state.currentTime == this.props.startTime && !this.state.isOn) {
//       this.startTimer()
//     }
//     /*stop timer if time is ended or if we pushed button to stop*/
//      if ((this.state.currentTime == 0 && this.state.isOn)) {
//       this.stopTimer();
//       this.props.onTimerEnd();
//     } else if (this.props.stopTimer) {
//       this.stopTimer();
//       this.resetTimer();
//     }
//     /*buttons*/
//     let stop = (this.state.isOn) ?
//       <button className="buttonTimer btn" onClick={this.stopTimer}>Stop</button> :
//       null
//     let reset = (this.state.currentTime != this.props.startTime && !this.state.isOn) ?
//       <button className="buttonTimer btn" onClick={this.resetTimer}>Reset</button> :
//       null
//     let resume = (this.state.currentTime != this.props.startTime && !this.state.isOn) ?
//       <button className="buttonTimer btn" onClick={this.startTimer}>Resume</button> :
//       null

//      return (
//        <div>
//         <p className="timerDisplay">{this.state.currentTime} sec</p>
//         {resume}
//         {stop}
//         {this.props.start ? reset : null}
//        </div>
//      );
//   }
// }

// class Exercise extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {startTimerIsOn: true, exerciseTimerIsOn: false, currentExerciseId: null, toStopTimer: false};
//     this.startTimerHandler = this.startTimerHandler.bind(this)
//     this.timerHandler = this.timerHandler.bind(this)
//   }
  
//   componentDidMount() {
//     this.setState({currentExerciseId: this.props.id})
//   }
  
//   componentDidUpdate() {
//     if (this.state.toStopTimer == true) {
//       this.setState({toStopTimer: false})
//     }
//   }
  
//   static getDerivedStateFromProps(props,state) {
//     if (props.id !== state.currentExerciseId ) {
//       return {
//         currentExerciseId: props.id,
//         startTimerIsOn: true,
//         exerciseTimerIsOn: false, 
//         toStopTimer: true
//       }
//     }
//     return null
//   }
  
  
//   startTimerHandler() {
//     this.setState({startTimerIsOn: false, exerciseTimerIsOn: true});
//   }
  
//   timerHandler() {
//     this.props.clickedNext();
//     this.setState({startTimerIsOn: true, exerciseTimerIsOn: false})
//   }
  
//   render() {
//     /*url of image to exercise*/
//     const URL = this.props.id != -1 ? exercises[this.props.id][3] : ""
//     /*timer to exercise if needed*/
//     const timer = this.state.exerciseTimerIsOn && this.props.time != 0 ? <Timer startTime={this.props.time} onTimerEnd={this.timerHandler} stopTimer={this.state.toStopTimer}/> : null
//   return (
//     <div>
//       <h2>{this.props.params}</h2>
//       {this.props.repeats == 0 && this.state.startTimerIsOn ? this.state.toStopTimer ? <p style={{display: "none"}}>Start in: <Timer startTime={5} onTimerEnd={this.startTimerHandler} start stopTimer={this.state.toStopTimer}/></p> : <p>Start in: <Timer startTime={5} onTimerEnd={this.startTimerHandler} start stopTimer={this.state.toStopTimer}/></p> : null}
//       {timer}
//       <button onClick={this.props.clickedBack} className="arrowButtons"><i class="arrow left"></i></button>
//       <img className="exerciseImage" src={URL} alt="Image" onError={(e)=>{e.target.onerror = null; e.target.src="https://lh3.googleusercontent.com/VheQyt5MuInfuac6oXWASJVWBkfvV0PFv_hTj01NjE9s-fdVJUTZdacAItem33Ny-0OZpwTgQb6_NuSciZj7cp1nLTA5pCNiz6LA8IixhbsZrX4qs4Qv0f3dW24D_NL4fnjKe54i1R55qJZ6079zbeutR8j8MUB24heTDMbEb0qCOg-VcvvoSTNli-akz-6E0-M28zhbjSZKV01DLMOj8LFeh2mmcLs9FmH1lw8jxKIzIknOZOzLuoAoWrprAZ3mrtjpywr4DZjwXC75t8Criap558e6Ict_vr8-MBPHfZsZHO2KhKjr2yg-8Ul9D-tnrr1RYbbUK2vjH48RwSFAS3F7DaqDZsU9PXOAh_SsEoqz-G-gpFMnk_5sIYEjsrpUGKL9Epf-3gsIR65S3m7oktJuxsS_oKRtWn4UBAm0cO8GQMiIH0s2CxPnhjt4P-Us5GG_9QYOETnorpxCKAX0vqerfLyiQGVpvsTez9VoAosMCy6RWpGPyXv4GnmIxbL3XgHe6jNyatOEl_Q4kGpVLjDb2qy63Vw0LMBvkO3JVS-X0h0k-LdsjsL0w-vT_BRDE3SMnLKhaVzscI7W6Z9yqpoNbxkMVdzCT0KM-dmPwOcmw806oA7InYm_Y1K1PSi0fSnTLNXs4EEClw0CsgvIn4IYjf2eVBNk0-MfYBJ5DBAXnwsHNac76uGF0uq3CVksBbWu2DzQlHRAb_l9qIVLn-HKmw=w290-h626-no"}}/>
//       <button onClick={this.props.clickedNext} className="arrowButtons"><i class="arrow right"></i></button>
//       </div>
//       )
//  }
// }

      

// class DoPartPlan extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {currentIdx: 0, countRounds: 1, totalRounds: 1, startIdxOfRound: 0, endIdxOfRound: -1};
//     this.handleNextClick = this.handleNextClick.bind(this);
//     this.handleBackClick = this.handleBackClick.bind(this);
//   };
  
  
//   handleNextClick = () => {
//     /*if it was last exercise in plan*/
//     let data = [];
//     switch (this.props.type) {
//       case "warmup":
//         data = this.props.warmup;
//         break;
//       case "exercises":
//         data = this.props.exercises;
//         break;
//       case "cooldown":
//         data = this.props.cooldown
//     }
//     if (this.state.currentIdx < data.length-1 && data[this.state.currentIdx+1] != "") {
//       this.setState({currentIdx: this.state.currentIdx + 1})
//     } else if (this.state.totalRounds != this.state.countRounds) {
//       /*last exercise in block of repeats but we have more repeats to do*/
//       this.setState({endIdxOfRound: this.state.currentIdx, currentIdx: this.state.startIdxOfRound, countRounds: this.state.countRounds+1})
//     } else {
//       this.setState({currentIdx: -1});
//       switch (this.props.type) {
//         case "warmup":
//           this.props.onWarmUpProgressChanged(DONE);
//           break;
//         case "exercises":
//           this.props.onExercisesProgressChanged(DONE);
//           break;
//         case "cooldown":
//           this.props.onCoolDownProgressChanged(DONE);
//       }
//     }
//   }
  
//   handleBackClick = () => {
//     console.log('1', this.state);
//     let data = [];
//     switch (this.props.type) {
//       case "warmup":
//         data = this.props.warmup;
//         break;
//       case "exercises":
//         data = this.props.exercises;
//         break;
//       case "cooldown":
//         data = this.props.cooldown
//     }
//     if (this.state.countRounds > 1 && this.state.currentIdx == this.state.startIdxOfRound) {
//       this.setState({currentIdx: this.state.endIdxOfRound, countRounds: this.state.countRounds-1})
//     } else if (this.state.currentIdx > 1) {
//       this.setState({currentIdx: this.state.currentIdx-1})
//     }
//   }
 
  
//   render() {
    
//     let output = <div>1</div>;
    
//     if ( this.props.type == "warmup") {
//       output = this.props.prgsWarmUp === DONE ? <div className="planPartsCompleteList">Warm-up complete!</div> : this.props.prgsWarmUp === ON ? null : <button className="buttonInsidePlan" onClick={() => this.props.onWarmUpProgressChanged(ON)}>Go to warm-up</button>  
//     } else if (this.props.type == "exercises") {
//       output = this.props.prgsExercises === DONE ? <div className="planPartsCompleteList">Exercises complete!</div> : this.props.prgsExercises === ON ? null : this.props.prgsWarmUp === DONE ? <button className="buttonInsidePlan" onClick={() => this.props.onExercisesProgressChanged(ON)}>Go to exercises</button> : null
//     } else if (this.props.type == "cooldown") {
//       output = this.props.prgsCoolDown === DONE ? <div className="planPartsCompleteList">Cool-down complete!</div> : this.props.prgsCoolDown === ON ? null : this.props.prgsWarmUp === DONE && this.props.prgsExercises === DONE ? <button className="buttonInsidePlan" onClick={() => this.props.onCoolDownProgressChanged(ON)}>Go to cool-down</button> : null
//     }
    
//    if ((this.props.prgsWarmUp === ON && this.props.type =="warmup") || (this.props.prgsExercises === ON && this.props.type === "exercises") || (this.props.prgsCoolDown === ON && this.props.type === "cooldown"))  {
   
//     //calculate necessary data for exercise
//     let name = "";
//     let repeats = 0;
//     let time = 0;
//     let sides = false
//     let i = 0;
    
//     let data = []; 
//     switch (this.props.type) {
//       case "warmup":
//         data = this.props.warmup[this.state.currentIdx];
//         break;
//       case "exercises":
//         data = this.props.exercises[this.state.currentIdx];
//         break;
//       case "cooldown":
//         data = this.props.cooldown[this.state.currentIdx];
//     }      

//       //name of exercise
//   while (i < data.length) {
//       if ((/[a-zA-WYZ]/).test(data[i])) {
//         name = data.slice(i);
//         break;
//      } else { i+=1}
//    }
//       //if we have exercise with repeats number
//     if (data[1] == 'X') {
//       repeats = parseInt(data.slice(0,1))
//     }  else if (data[2] == 'X') {
//       repeats = parseInt(data.slice(0,2))
//     }
//       //if we have exercise with time
//     if (data.slice(2,4) == "''") {
//      time = parseInt(data.slice(0,2));
//       if (data.slice(4,5) == "(") {
//         sides = true
//       }
//     } else if (data.slice(1,2) == "'" && data.slice(4,6) == "''") {
//       time = parseInt(data.slice(0,1))*60+parseInt(data.slice(2,4))
//       if (data.slice(6,7) == "(") {
//         sides = true
//       }
//     } else if (data.slice(1,2) == "'")
//     {
//        time = parseInt(data.slice(0,1))*60
//        if (data.slice(2,3) == "(") {
//          sides: true
//        }
//     }
//       //find current exercise in DB
//     let id = -1;
//     if (exercisesDict[name]) {
//       id =  exercisesDict[name]}
      
//     output = null;
//       //handle repeats blocks
//     if (data == "2 ROUNDS") {
//       if (this.state.totalRounds != this.state.countRounds) {
//         this.setState({countRounds: this.state.countRounds+1, currentIdx: this.state.startIdxOfRound})
//       } else {
//         this.setState({totalRounds: 2, countRounds: 1, startIdxOfRound: this.state.currentIdx + 1})
//       this.handleNextClick();
//       }
//     } else if (data == "3 ROUNDS") {
//       if (this.state.totalRounds != this.state.countRounds) {
//         this.setState({countRounds: this.state.countRounds+1, currentIdx: this.state.startIdxOfRound})
//       } else {
//         this.setState({totalRounds: 3, countRounds: 1, startIdxOfRound: this.state.currentIdx +1})
//       this.handleNextClick();
//       }
//     } else if (data == '/') {
//       console.log('exercise, /', this.state)
//       if (this.state.totalRounds > this.state.countRounds) {
//         this.setState({countRounds: this.state.countRounds+1, currentIdx: this.state.startIdxOfRound})
//       } else {
//         this.handleNextClick();
//       } 
//     }  else {      
//     output = <Exercise params={data} name={name} id={id} time={time} repeats={repeats} sides={sides} clickedNext={this.handleNextClick} clickedBack={this.handleBackClick}/>
//     }
//   }   
    
//     return (
//       <div style={{"text-align": "center"}}>
//         {output}
//       </div>
//     );
//   }
// }

// const DoPartPlanContainer = connect(
//   mapStateToProps = state => {
//     return {
//       exercises: state.planExercises,
//       warmup: state.planWarmUp,
//       cooldown: state.planCoolDown,
//       prgsWarmUp: state.progressWarmUp,
//       prgsExercises: state.progressExercises,
//       prgsCoolDown: state.progressCoolDown
//     }
//   },
//   mapDispatchToProps = dispatch => {
//     return {
//         onWarmUpProgressChanged: (progress) => dispatch({type: CHANGE_WARMUP, progress: progress}),
//         onExercisesProgressChanged: (progress) => dispatch({type: CHANGE_EXERCISES, progress: progress}),             onCoolDownProgressChanged: (progress) => dispatch({type: CHANGE_COOLDOWN, progress: progress}),
//     }
//   })(DoPartPlan);



// class DoPlan extends React.Component {
//   render() {
//    return (
//     <div className="plans">
//         <div className="marginButton"><button className="buttonInsidePlan centerButton" onClick={this.props.clicked}> <i class="fa fa-home"></i> Home</button></div>
//       <DoPartPlanContainer type="warmup" />
//         {this.props.prgsWarmUp === ON ? <div className="marginButton"><button onClick={this.props.onWarmUpProgressChanged} className="buttonInsidePlan centerButton">Skip warm-Up</button></div> : null}
//       <DoPartPlanContainer type="exercises" />
//       {this.props.prgsWarmUp === DONE && this.props.prgsExercises === ON ? <div className="marginButton"><button onClick={this.props.onExercisesProgressChanged} className="buttonInsidePlan centerButton">Skip exercises</button></div> : null}
//       <DoPartPlanContainer type="cooldown" />
//       {this.props.prgsWarmUp === DONE && this.props.prgsExercises === DONE && this.props.prgsCoolDown === ON ? <div className="marginButton"><button onClick={this.props.onCoolDownProgressChanged} className="buttonInsidePlan centerButton">Skip cool-Down</button></div> : null}
//     </div>
//      )
//   }
// }


// const DoPlanContainer = connect(
//   mapStateToProps = state => {
//     return {
//       prgsWarmUp: state.progressWarmUp,
//       prgsExercises: state.progressExercises,
//       prgsCoolDown: state.progressCoolDown
//     }
//   },
//   mapDispatchToProps = dispatch => {
//     return {
//         onWarmUpProgressChanged: () => dispatch({type: CHANGE_WARMUP, progress: DONE}),
//         onExercisesProgressChanged: () => dispatch({type: CHANGE_EXERCISES, progress: DONE}),             onCoolDownProgressChanged: () => dispatch({type: CHANGE_COOLDOWN, progress: DONE}),
//     }
//   })(DoPlan);

// class InsidePlan extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {clicked: false};
//     this.handleClick = this.handleClick.bind(this)
//   };
  
//   handleClick () {
//     this.setState({clicked: true});
//     //this.props.onWarmUpProgressChanged();
//   }
  
//   render() {
//     return this.state.clicked ? <DoPlanContainer clicked={this.props.clicked}/> :
//    (
//     <div className="insidePlan">
//       <button className="buttonInsidePlan btn btn-primary" onClick={this.props.clicked}><i class="fa fa-home"></i> Home</button>
//       <button className="buttonInsidePlan btn" onClick={this.handleClick}><i class="fa fa-play" aria-hidden="true"></i> Let's do it!</button>
//       <div className="planInfo">
//       {this.props.info.map((plan, i) => {
//         switch (i) {
//           case 0:
//             return 
//           case 1:
//             return <p><strong>Name:</strong> {plan}</p>;
//           case 2:
//             return <p><strong>Time:</strong> {plan} min</p>;
//           case 3: 
//             return <p><strong>Kcal:</strong> {plan}</p>;
//           case 4:
//             return <p><strong>Type:</strong> {plan}</p>;
//           case 5: 
//             return <p><strong>Level:</strong> {plan}</p>
//         }
//       })}
//         </div>
//         <div className="planPartsList">
//       <p className="planPartsListTitle">Exercises:</p>
//       {this.props.exercises.map((exercise,i) => {
//           return <p>{exercise}</p>
//         })}
//         </div>
//         <div className="planPartsList">
//       <p className="planPartsListTitle">Warm-up:</p>
//               {this.props.warmup.map(exercise => <p>{exercise}</p>)}
//         </div>
//         <div className="planPartsList">
//       <p className="planPartsListTitle">Cool-Down:</p>
//       {this.props.cooldown.map(exercise => <p>{exercise}</p>)}
//         </div>
//     </div>
//   )
//   }
// }

// const InsidePlanContainer = connect(
//   mapStateToProps = state => {
//     return {
//       info: state.planInfo,
//       exercises: state.planExercises,
//       warmup: state.planWarmUp,
//       cooldown: state.planCoolDown
//     }
//   },
//   null
// )(InsidePlan);

// const Plan = (props) => {
//   return (
//     <div className="plan" onClick={props.onClick} id={props.params[0]}>
//       <p style={{"font-weight": "bold"}}>{props.params[1]}</p>
//       <p><span style={{"float": "left"}}>Type: {props.params[4]}</span> <span style={{"float": "right"}}>Level: {props.params[5]}</span></p>
//     </div>
//   );
// }

// class Plans extends React.Component {
  
//   constructor(props) {
//     super(props);
//     this.state = {plans: [], 
//            exercises: [],
//            warmup: [],
//            cooldown: [],
//            error: false,
//            clicked: false,
//            selectedLevel: 'All',
//            selectedType: 'All'
//     };
//     this.handleClick = this.handleClick.bind(this);
//     this.handleLevelSelect = this.handleLevelSelect.bind(this);
//     this.handleTypeSelect = this.handleTypeSelect.bind(this);
//     this.getWarmUpCoolDown = this.getWarmUpCoolDown.bind(this);
//     this.handleHomeButton = this.handleHomeButton.bind(this)
//   }
  
//   componentDidMount() { 
//    let plans = []; database.ref("/Plans/").once("value").then((snapshot) => {
//      snapshot.val().forEach(element => 
//        { plans.push(Object.values(element))
//        })
//      this.setState({plans: plans})
//     });
//        let warmUp = []; database.ref("/Warm-up/").once("value").then((snapshot) => {
//      snapshot.val().forEach(element => 
//        { warmUp.push(Object.values(element))
//        })
//      this.setState({warmup: warmUp});
//      });
//        let coolDown = []; 
//        database.ref("/Cool-down/").once("value").then((snapshot) => {
//      snapshot.val().forEach(element => 
//        { coolDown.push(Object.values(element))
//        })
//      this.setState({cooldown: coolDown});
//     });
//        database.ref("/Exercises/").once("value").then((snapshot) => {
//      snapshot.val().forEach(element => 
//        { exercises.push(Object.values(element))
//          exercisesDict[Object.values(element)[1]] = Object.values(element)[0]
//        })
//     })
//   };
  
//   handleClick(id) {
//     this.setState({clicked: true});
//     this.props.onExercisesChanged(this.state.plans[id-1].slice(0,6), this.state.plans[id-1].slice(6), this.getWarmUpCoolDown(id-1, 0), this.getWarmUpCoolDown(id-1, 1));
//   };
  
//   handleLevelSelect(event) {
//     this.setState({selectedLevel: event.target.value})
//   };
  
//   handleTypeSelect(event) {
//     this.setState({selectedType: event.target.value})
//   }
  
//   getWarmUpCoolDown(clickedIdx, flag) {
//     const props = this.state.plans[clickedIdx];
//     let idx = 0;
//     idx += parseInt(props[5])*5-5;
//     switch (props[4]) {
//       case "CORE":
//         break;
//       case "CARDIO":
//         idx+=1;
//         break;
//       case "LOWER BODY":
//         idx+=2;
//         break
//       case "UPPER BODY":
//         idx+=3;
//         break;
//       case "FULL BODY":
//         idx+=4;
//         break;
//       default:
//         idx = Null
//     }; 
//     if (flag == 0) {
//       return this.state.warmup[idx].slice(2)
//     } else {
//       return this.state.cooldown[idx].slice(2)
//     }
//   }
  
//   handleHomeButton () {
//     this.setState({clicked: false});
//     this.props.onWarmUpProgressChanged();
//     this.props.onExercisesProgressChanged();
//     this.props.onCoolDownProgressChanged()
//   }
  
//   render() {
//     if (this.state.clicked === false) {
//       return (
//       <div className="plans">
//         <h1>Plans</h1>
//           <p className="filterLine">
//           <select value={this.state.selectedLevel} onChange={this.handleLevelSelect} className="custom-select">
//             <option disabled>Level</option>
//             <option value="All">Filter by Level</option>
//             <option value="1">1</option>
//             <option value="2">2</option>
//             <option value="3">3</option>
//             <option value="4">4</option>
//             <option value="5">5</option>
//           </select>
//           <select value={this.state.selectedType} onChange={this.handleTypeSelect} className="custom-select">
//             <option disabled>Type</option>
//             <option value="All">Filter by type</option>
//             <option value="CORE">CORE</option>
//             <option value="CARDIO">CARDIO</option>
//             <option value="UPPER BODY">UPPER BODY</option>
//             <option value="FULL BODY">FULL BODY</option>
//             <option value="LOWER BODY">LOWER BODY</option>
//           </select>
//           </p>
//           <div className="plansList">
//          {this.state.plans.map((plan, idx) => 
//            {
//         if ((this.state.selectedLevel != 'All' && this.state.selectedLevel != plan[5]) || (this.state.selectedType != 'All' && this.state.selectedType != plan[4])) {
//           return
//         }
//         return <Plan params={plan} onClick={() => this.handleClick(plan[0])}/>}
//         )}
//           </div>
//       </div>
//     );}
//     else {     
//       return (
//       <InsidePlanContainer clicked={this.handleHomeButton}/>
//       )
//     }
//   }
// }

// const PlansContainer = connect(
//   null,
//   mapDispatchToProps = dispatch => {
//     return {
//         onExercisesChanged: (info, exercises, warmup, cooldown) => dispatch({type: ADD_EXERCISES, newInfo: info, newExercises: exercises, newWarmUp: warmup, newCoolDown: cooldown}),
//       onWarmUpProgressChanged: () => dispatch({type: CHANGE_WARMUP, progress: OFF}),
//       onExercisesProgressChanged: () => dispatch({type: CHANGE_EXERCISES, progress: OFF}),             
//       onCoolDownProgressChanged: () => dispatch({type: CHANGE_COOLDOWN, progress: OFF}),
//     }
//   })(Plans);


// //store for redux
// const store = createStore(reducer);

// const app = (
//     <Provider store={store}>
//        <PlansContainer />
//     </Provider>
// );

// ReactDOM.render(app, document.getElementById('root'));
