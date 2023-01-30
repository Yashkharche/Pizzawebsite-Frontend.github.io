import axios from "axios"



let cart1=document.querySelectorAll('.add-to-cart')


function updateCart(pizza){
axios.post(('/updatebag',pizza),function(res){
console.log(res)
})

}


cart1.forEach(function(btn){
    btn.addEventListener('click',function(e){
        let pizza=JSON.parse(btn.dataset.pizza)
        updateCart(pizza)
    
    })
});