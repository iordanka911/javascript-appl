async function getInfo() {

    //read input value
    //request to server
    //parse data 
    //display
    //check error
    //console.log("TODO...");
    const stopNameElement=document.getElementById('stopName');
    const timeTableelement=document.getElementById('buses');
    const stopId=document.getElementById('stopId').value;
    const url = `http://localhost:3030/jsonstore/bus/businfo/${stopId}`;


    try {
    stopNameElement.textContent='Loading...'
    timeTableelement.replaceChildren();
    const res=await fetch(url);

    if(res.status!==200){
        alert('Stop ID not found!');
    }
    const data =await res.json();
    
    stopNameElement.textContent=data.name;
    Object.entries(data.buses).forEach(b=>{
        const liElement = document.createElement('li');
        liElement.textContent=`Bus ${b[0]} arrives in ${b[1]} minutes`;
        timeTableelement.appendChild(liElement);
        console.log(b);
    })
    } catch (error) {
       // console.log(error);
    }

    console.log(res);
}