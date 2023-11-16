export function addelement(){
    const res = fetch('url')        
    .then(response => response.json())
    .then(data => console.log(data));
  
    return res;
}
