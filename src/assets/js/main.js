var receiverInfoButton = document.querySelector("#receiver-info-button");
var receiverInfoContainer = document.querySelector("#receiver-info-container");
var conversation = document.querySelector("#conversation");
var toggleReceiverContainerButton = document.getElementById("toggleReceiverContainerButton");
var currentWidth = 0;

receiverInfoButton.addEventListener('click', function () {
    if (currentWidth > 1200) {
        receiverInfoContainer.style.height = "100%";
        if (receiverInfoContainer.clientWidth > 0) {
            receiverInfoContainer.style.width = "0%";
            receiverInfoContainer.style.opacity = "0";
            receiverInfoButton.classList.remove("active");
            conversation.style.width = "100%";

        } else if (receiverInfoContainer.clientWidth <= 0) {
            conversation.style.width = "70%";
            receiverInfoContainer.style.width = "30%";
            receiverInfoContainer.style.opacity = "1";
            receiverInfoButton.classList.add("active");
        }
    } else {
        toggleReceiverContainerResponsive()
    }
});


toggleReceiverContainerButton.addEventListener('click', toggleReceiverContainerResponsive)
function toggleReceiverContainerResponsive() {
    if (currentWidth < 1200) {
        receiverInfoContainer.width = "100%";
        if (receiverInfoContainer.clientHeight > 0) {
            receiverInfoContainer.style.height = 0;
            toggleReceiverContainerButton.style.display = "none";
        } else if (receiverInfoContainer.clientHeight <= 0) {
            toggleReceiverContainerButton.style.display = "block";
            receiverInfoContainer.style.height = "100%";
        }
    }
}


window.onload = () => currentWidth = window.innerWidth;
window.onresize = () => currentWidth = window.innerWidth;

// window.onresize = () =>{
//     if(window.innerHeight > 1200){
//         console.log("working 1" + window.innerHeight)
//         receiverInfoContainer.style.height = "100%";
//     }else{
//         console.log("working 2")
//         receiverInfoContainer.style.height = "00%";
//     }
// }


var navbar = document.querySelector('.navbar');
var chatFront = document.querySelector('.chat-front');
var conversationContainer = document.querySelector('#conversation-container');

var allChatItem = document.querySelectorAll(".chat-item");
allChatItem.forEach((chatItem) => {
    chatItem.addEventListener("click", function () {
        // // Hide navbar and chat front
        navbar.style.display = 'none';
        chatFront.style.display = 'none';

        // Show conversation container
        conversationContainer.style.display = 'block';
    })
})

var chatBackButtons = document.querySelectorAll(".chat-back");
chatBackButtons.forEach((backButton)=>{
    backButton.addEventListener('click', function(){
         // // Hide navbar and chat front
         navbar.style.removeProperty("display");
         chatFront.style.removeProperty("display")
 
         // Show conversation container
         conversationContainer.style.display = 'none';
    })
})


// function hideElements() {
//     // Get all elements on the page
//     var elements = document.getElementsByTagName("*");

//     // Iterate through each element
//     for (var i = 0; i < elements.length; i++) {
//         // Check if the element's ID is "myBox"
//         if (elements[i].id !== "conversation-container") {
//             // Set display property to "none"
//             // elements[i].style.display = "none";
//         }
//         console.log("Id is: " + elements[i].id);
//     }
// }