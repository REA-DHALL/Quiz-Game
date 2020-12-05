const questionNumber=document.querySelector(".question-number");
const questionText=document.querySelector(".question-text");
const optionContainer=document.querySelector(".option-container");
const homeBox =document.querySelector(".home");
const quizBox =document.querySelector(".quiz-box");
const resultBox =document.querySelector(".result");


let questionCounter = 0;
let currentQuestion;
let availableQuestion=[];
let availableOptions=[];
let correctAnswers=0;
//let attempt=0

//push the questio intp available question array
function  setAvailableQuestions(){
	const totalQuestion=quiz.length;
	for(let i=0;i<totalQuestion;i++){
		availableQuestion.push(quiz[i])
	}
}
function getNewQuestion(){
   //set question  number
   questionNumber.innerHTML ="Question " +(questionCounter +1);
   //set question text and get random question
   const questionIndex=availableQuestion[Math.floor(Math.random()*availableQuestion.length)];
   currentQuestion= questionIndex;
   questionText.innerHTML=currentQuestion.q;
   //get the position of questionIndex from the avaiablequestion array
   const index1 =availableQuestion.indexOf(questionIndex);
   //remove the selected question to avoid repeatition
   availableQuestion.splice(index1,1);
   //set options
   const optionLen =currentQuestion.options.length
   //push options into available options array
   for(let i=0;i<optionLen;i++){
    availableOptions.push(i)
   }
   optionContainer.innerHTML='';
   let animationDelay =0.12;

   //create options in html
   for(let i=0;i<optionLen;i++){
    //random option
    const optionIndex=availableOptions[Math.floor(Math.random()*availableOptions.length)];
    //get position of options
    const index2 =availableOptions.indexOf(optionIndex); 
    //remove selected option to avoid repitition
    availableOptions.splice(index2,1);
    const option =document.createElement("div");
    option.innerHTML =currentQuestion.options[optionIndex];
    option.id=optionIndex;
    option.style.animationDelay=animationDelay +'s';
    animationDelay =animationDelay+0.12;
    option.className ="option";
    optionContainer.appendChild(option);
    option.setAttribute("onclick","getResult(this)");

   }
   questionCounter++

}
function getResult(element){
  const id = parseInt(element.id);
  //compare answer 
  if(id=== currentQuestion.answer){
     //set the correct option green
    element.classList.add("correct");
    correctAnswers++;
  }
  else{
    //set the wrong option red
    element.classList.add("wrong");
    // if the answer is incorrect show correct option
    const optionLen=optionContainer.children.length;
    for(let i=0;i<optionLen;i++){
      if(parseInt(optionContainer.children[i].id)=== currentQuestion.answer){
        optionContainer.children[i].classList.add("correct");
      }
    }
  }
  //attempt++
  unclickableOption();
}
//make other options unclickable when one is selected
function unclickableOption() {
  const optionLen=optionContainer.children.length;
  for(let i=0;i<optionLen;i++){
    optionContainer.children[i].classList.add("already-answered");
  }
  
}
function next(){
  if(questionCounter ===quiz.length){
    quizOver();
  }
  else {
    getNewQuestion();
  }
}
function quizOver() {
  //hide quiz box
  quizBox.classList.add("hide");
  resultBox.classList.remove("hide");
  quizResult();
  
}
function resetQuiz(){
  questionCounter = 0;
  correctAnswers=0;
//let attempt=0

}
function tryAgainQuiz(){
  // hide the resutbox
  resultBox.classList.add("hide");
  //show quizbox
  quizBox.classList.remove("hide");
  resetQuiz();
  startQuiz();

}
function goToHome(){
  //hide resultBox
  resultBox.classList.add("hide");
  //show homebox
  homeBox.classList.remove("hide");
  resetQuiz();

}
function quizResult(){
  resultBox.querySelector(".total-score").innerHTML=correctAnswers+ " OUT OF "+quiz.length;
}
////starting quiz
 function startQuiz(){
  //hide homebox
  homeBox.classList.add("hide");
  //show quizbox
  quizBox.classList.remove("hide");
	//first set all the question in availableQuestion array
	setAvailableQuestions();
	//second we will call method to get the questions
	getNewQuestion();

}
window.onload=function () {
  homeBox.querySelector(".total-question").innerHTML=quiz.length;
}