const nextQues = document.querySelectorAll('.nextQues')
let checkAttempt = 0;
let score = 0;
// console.log(nextQues)
$.get('/api/question/1' , (detail) => {
    // console.log(detail)
    // console.log(detail.answer)
    let correctAnswer = detail.answer
    $('#ques').append(`
    ${detail.question}
    <div class="form-check">
      <input class="form-check-input kaksha" type="radio" name="option" id="option1" value="option1">
      <label class="form-check-label" for="option1">
      ${detail.option1}
      </label>
    </div>
    <div class="form-check">
      <input class="form-check-input kaksha" type="radio" name="option" id="option2" value="option2">
      <label class="form-check-label" for="option2">
      ${detail.option2}
      </label>
    </div>
    <div class="form-check">
      <input class="form-check-input kaksha" type="radio" name="option" id="option3" value="option3">
      <label class="form-check-label" for="option3">
      ${detail.option3}
      </label>
    </div>
    <div class="form-check">
      <input class="form-check-input kaksha" type="radio" name="option" id="option4" value="option4">
      <label class="form-check-label" for="option4">
      ${detail.option4}
      </label>
    </div>
    <button type="button" class="btn btn-outline-info" id="1" onClick = "nextSubmit(1)">Submit</button>
    `)
    
})
nextQues.forEach((nextQue) => {
    nextQue.addEventListener('click' , () => {
        // console.log('You Have clicked the following id no. ', nextQue.id)-->note
        
        $('#ques').html(''); 
        $.get(`/api/question/${nextQue.id}` , (detail) => {
            // console.log(detail)
            
            $('#ques').append(`
    ${detail.question}
    <div class="form-check">
      <input class="form-check-input" type="radio" name="option" id="option1" value="option1">
      <label class="form-check-label" for="option1">
      ${detail.option1}
      </label>
    </div>
    <div class="form-check">
      <input class="form-check-input" type="radio" name="option" id="option2" value="option2">
      <label class="form-check-label" for="option2">
      ${detail.option2}
      </label>
    </div>
    <div class="form-check">
      <input class="form-check-input" type="radio" name="option" id="option3" value="option3">
      <label class="form-check-label" for="option3">
      ${detail.option3}
      </label>
    </div>
    <div class="form-check">
      <input class="form-check-input" type="radio" name="option" id="option4" value="option4">
      <label class="form-check-label" for="option4">
      ${detail.option4}
      </label>
    </div>
    <button type="button" class="btn btn-outline-info" id="${detail.id}" onClick = "nextSubmit(${detail.id})">Submit</button>
    `)
        })
    })
})
function nextSubmit(id){
        console.log(id);
        let checkDisability = document.getElementById(id).disabled;
        if(checkDisability == false && id <= nextQues.length){
            //IT IS FOR RADIO VALUE INPUT
        let radioValue = $("input[name='option']:checked").val();
        if(radioValue != undefined){
            //agar click nahi karagae to agae bhi nahi jayagae
            // console.log(radioValue.substr(6,1))
            let ansProvided = radioValue.substr(6 , 1);
            // console.log(ansProvided)
            $.post('/api/submissions' , {
                question: id,
                attempt: 1,
                yourAnswer: ansProvided
            }, (data) => {console.log(data)})
            const buttonToDisable = document.getElementById(id);
            buttonToDisable.disabled = true;
            checkAttempt++;
        }
        checkDisability = document.getElementById(id).disabled;
        while(checkDisability == true && id <= nextQues.length){
            id++;
            if(id <= nextQues.length){
                checkDisability =  document.getElementById(id).disabled;
            }
            console.log("ID INSIDE THE WHILE:- " ,id)
        }
        console.log("ID OUTSIDE THE WHILE:- " ,id)
        if(id <= nextQues.length){
            console.log('your next ques is ' , id)
                $.get(`/api/question/${id}` , (detail) => {
                    // console.log(detail)
                    $('#ques').html(''); 
                    $('#ques').append(`
            ${detail.question}
            <div class="form-check">
            <input class="form-check-inpu" type="radio" name="option" id="option1" value="option1">
            <label class="form-check-label" for="option1">
            ${detail.option1}
            </label>
            </div>
            <div class="form-check">
            <input class="form-check-inpu" type="radio" name="option" id="option2" value="option2">
            <label class="form-check-label" for="option2">
            ${detail.option2}
            </label>
            </div>
            <div class="form-check">
            <input class="form-check-inpu" type="radio" name="option" id="option3" value="option3">
            <label class="form-check-label" for="option3">
            ${detail.option3}
            </label>
            </div>
            <div class="form-check">
            <input class="form-check-inpu" type="radio" name="option" id="option4" value="option4">
            <label class="form-check-label" for="option4">
            ${detail.option4}
            </label>
            </div>
            <button type="button" class="btn btn-outline-info" id="${detail.id}" onClick = "nextSubmit(${detail.id})">Submit</button>
            `)
                })
        }
    }
    if(id == nextQues.length + 1 && checkAttempt == nextQues.length){
        $.post('/api/count' , (data)=>{
            console.log(data)
            window.alert(`test ends your scoor is ${data.length} out of ${nextQues.length} ` )

        })
    }
}
function checkIfAttempted(id){
    let val = 0;
    $.ajaxSetup({async: false});
    $.ajax({
        type: "POST",
        async: "false",
        url: "/api/checkSubmissions",
        data: {  question: id },
        
        success: function(data) {
            if(data == "true"){
                console.log(data + "IN THE DATA")
                val =  1;
            }else{
                console.log(data + "IN THE DATA")
                val = 0;
            }
        }
    });
    // $.post('/api/checkSubmissions' , {
    //     question: id
    //     },(data)=>{

    //         if(data == "true"){
    //             console.log(data + "IN THE DATA")
    //             val =  1;
    //         }else{
    //             console.log(data + "IN THE DATA")
    //             val = 0;
    //         }
    //     }
    // )
    console.log(val + "Outside the data")
    return val;
}
let timerid = 0;
let count = 18 * nextQues.length;
let start = document.getElementById ("start");
let stop = document.getElementById ("stop");
let reset = document.getElementById ("reset");
let timer = document.getElementById ("timer");
function start_down () {
    count--;
    if (count<= 0) {
        clearInterval (timerid);
    }
    display ();
}
function display () {
    if (count>0) {
        var min = Math.floor (count/60);
        var sec = count% 60;
        timer.innerHTML = ("0" + min) .slice (-2) + ":" + ("0" + sec) .slice (-2);
    } else {
        $.post('/api/count' , (data)=>{
            console.log(data)
            window.alert(`TIME'S UP :-> test ends your score is ${data.length} out of ${nextQues.length} ` )
        })

        // timer.innerHTML = "Timeup";
    }
}
function start_on () {
    start_down ();
    timerid = setInterval (start_down, 1000);
}
function stop_on () {
    clearInterval (timerid);
}
function reset_on () {
    stop_on ();
    count = 180;
    display ();
}
window.onload = start_on()