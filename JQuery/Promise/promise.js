const get_request = (URL) => {
   return new Promise(function (resolve, reject) {
       let xhr = new XMLHttpRequest();
       xhr.open('GET', URL);

       xhr.send();

       xhr.onload = function () {
           if(xhr.status === 200) {
               resolve(xhr.response);
           } else {
               reject(Error(xhr.statusText));
           }
       }
       xhr.onerror = function () {
           reject(Error("Error occurred when fetching data from server."));
       };
   });
}
