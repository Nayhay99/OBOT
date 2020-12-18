var head = document.getElementsByTagName('head')[0];
var script = document.createElement('script')

script.type = 'text/javascript';
script.src = "http://code.jquery.com/jquery-2.2.1.min.js";

script.onreadystatechange = handler;
script.onload = handler;

// Fire the loading
head.appendChild(script);

function handler(){
   console.log('jquery added :)');
}

var action, oid;
var botui = new BotUI("myBot")



$(document).ready(function(){
    console.log("hello ji");
    botui.message.add({
        content: "Hey!I am OBOT 😎. How may I help you?",
    });

    botui.action.button({
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
            }
        ]
        })
        .then(function (msg) {
            action = msg.value
            botui.message.add({
                loading : true,
                content: "Please enter your order ID",
                delay : 1000
                });
            botui.action.text({
            action: {
                placeholder: "orderID"
            },delay:2000})
            .then(function(res){
                oid = res.value
                botui.message.add({
                loading : true,
                content : "Please wait while we fetch the details.",
                delay : 1000
                })

                $.ajax({
                    type : "GET",
                    url : "http://localhost:3344",
                    data : action + oid,
                    success : function(data){
                        console.log(data);
                        botui.message.add({
                            // loading : true,
                            content : data,
                            delay : 2000
                        })
                    }
                })

            }
        )
    });
})

