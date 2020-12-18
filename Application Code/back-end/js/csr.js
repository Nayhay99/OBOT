//change this for customers
var head = document.getElementsByTagName('head')[0];
var script = document.createElement('script');
script.type = 'text/javascript';
script.src = "http://code.jquery.com/jquery-2.2.1.min.js";
script.onreadystatechange = handler;
script.onload = handler;

// Fire the loading
head.appendChild(script);

function handler(){
   console.log('jquery added :)');
}

var op, oid;
var query = []
var complaint = []
var botui = new BotUI("myBot")
var botDiv = document.getElementById("myBot")

$(document).ready(function x(){

    console.log("hello ji");
    botui.message.add({
        content: "Hey!I am OBOT 😎. How may I help you?",
    })
    .then(() => {
    botui.action.button({
        autoHide : true,
        action:[
            {
                text : "I am a Dell agent.",
                value : "agent"
            },
            {
                text : "I am a customer.",
                value : "customer"
            }
        ]
    })
    .then((user) => {
        if(user.value === "agent"){
            // botDiv.style.display = "none"
            var element = document.getElementById("id01")
            element.style.display = "block"
        }

    botui.action.button({
        autoHide : true,
        action: [
            {
            text: "Order Status",
            value: "os"
            },
            {
                text: "Order Refund Status",
                value: "ors"
            },
            {
                text : "Order Cancellation Status",
                value : "ocs"
            },
            {
                icon : "keyboard-o",
                text : "Type",
                value : "t"
            },
            // {
            //     icon :"microphone",
            //     text: 'Speak',
            //     value: 'mic'
            // }
            {
                text : "complaints",
                value : "c"
            }
        ],delay : 2000
        }
    )
        .then(function (msg) {
            op = msg.value
            query.push(op);
            console.log(op);
            botui.action.hide()
            if(op == "t"){
                botui.message.add({
                    loading : true,
                    content : "Please type in your query",
                    delay : 1000
                }).then(function(){
                    botui.action.text({
                        action : {
                            placeholder : "Ask me"
                        },delay : 1000
                    }).then(function(res){
                        console.log(res.value);
                        $.ajax({
                            type : "GET",
                            url : '../../ml/chatbot/main.py',

                        })

                    })
                })
            }   //here remove else on processing the typed query
            if(op == "c"){


                $.ajax({
                    type : "GET",
                    url : "http://localhost:3344/csr/complaints/",
                    success : (compResult) => {
                        console.log(compResult);
                        console.log(compResult[0].text);
                        botui.action.button({
                            action : [
                                {
                                    text : compResult[0].text,
                                    value : compResult[0].complaintId
                                },
                                {
                                    text : compResult[1].text,
                                    value : compResult[1].complaintId
                                },
                                {
                                    text : compResult[2].text,
                                    value : compResult[2].complaintId
                                },
                                {
                                    text : compResult[3].text,
                                    value : compResult[3].complaintId
                                },
                                {
                                    text : compResult[4].text,
                                    value : compResult[4].complaintId
                                },
                                {
                                    text : compResult[5].text,
                                    value : compResult[5].complaintId
                                },

                            ]
                        }).then((compId) =>
                        {
                            if(compId.value === "others"){
                                botui.message.add({
                                    loading : true,
                                    content : "Select the department against whom complaint is to be filed",
                                    delay : 1000
                                }).then(function() {
                                    console.log("dept");
                                    botui.action.button({
                                        autoHide : true,
                                        action : [
                                            {
                                                text : "orders",
                                                value : "0rders"
                                            },
                                            {
                                                text : "assembly",
                                                value : "assembly"
                                            },
                                            {
                                                text : "manufacturing",
                                                value : "manufacturing"
                                            },
                                            {
                                                text : "logistics",
                                                value : "logistics"
                                            },

                                        ],
                                        delay : 1000
                                    })
                                    .then((dept) => {
                                        complaint.push(dept.value)
                                        botui.action.text({
                                            action : {
                                                placeholder : "Enter your complaint"
                                            }
                                        }).then((comp) => {
                                            complaint.push(comp.value)
                                            console.log(complaint);
                                            $.ajax({
                                                type : "POST",
                                                url : "http://localhost:3344/csr/complaints/",
                                                data : {department : complaint[0], complain : complaint[1]},
                                                success : () => {
                                                    botui.message.add({
                                                        content : "Complaint registered",
                                                        delay : 1000
                                                    })
                                                }
                                            })
                                        })

                                    })
                                })

                            }
                            else{
                                $.ajax({
                                    type : "GET",
                                    url : "http://localhost:3344/csr/complaints/counter",
                                    data : {complaintId : compId.value},
                                    success : () => {
                                        botui.message.add({
                                            content : "Complaint registered",
                                            delay : 1000
                                        })
                                    }
                                })

                            }
                        })
                    }

                })


                //display the array and on clicking others

            }

            if(op !== "c" && op !== "t"){
                console.log(op);
                botui.message.add({
                    loading : true,
                    content: "Please enter your order ID",
                    delay : 1000
                }).then(function(){
                 botui.action.text({
                        action: {
                            placeholder: "orderID"
                        },delay:1000})
                    .then(function(res){
                        oid = res.value
                        query.push(oid)
                        console.log(query);
                        console.log(oid);
                        botui.message.add({
                        loading : true,
                        content : "Please wait while we fetch the details 🧐",
                        delay : 1000
                        })
                        .then(function(){
                            console.log("near ajax");

                        $.ajax({
                            type : "GET",
                            url : "http://localhost:3344/csr/",
                            data : {"orderId": query[1], "status" : query[0]},
                            success : function(data){
                                console.log(data);
                                botui.message.add({
                                    // loading : true,
                                    human : false,
                                    type : "html",
                                    content : `${data.response.text}`,
                                    delay : 2000
                                })
                            .then(function(){
                                botui.message.add({
                                    loading : true,
                                    content : "Do you have any other queries?",
                                    delay : 1000
                                })
                                .then(function(){
                                    botui.action.text({
                                        action: {
                                            placeholder: "Type yes or no"
                                        },delay:1000})
                                        .then((res) => {
                                            if(res.value == "YES" || res.value == "yes")
                                            {
                                                x();
                                            }
                                            else{
                                                botui.message.add({
                                                    loading : true,
                                                    content : "Have a good day!",
                                                    delay:1000
                                                })
                                            }
                                        })
                                })
                            })


                        }})
                    })
                })
                })
            }
    });
})
})
})