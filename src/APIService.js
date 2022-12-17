


export default class APIService {


  static UpdateApplication(application_id, body) {
    console.log(body)
    return fetch(`http://127.0.0.1:8004/api/applications/applications/update/${application_id}`, {
       'method':'PUT',
       headers: {
           'Content-Type':'application/json',
           'Authorization': `JWT ${localStorage.getItem('access')}`
         }, 
         body:JSON.stringify(body)

    }).then(resp => resp.json())


   }
    
    static CreateApplication(body) {

     return fetch(`http://127.0.0.1:8004/api/applications/applications/upload/`, {
        'method':'POST',
        headers: {
            'Content-Type':'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`
          }, 
          body:JSON.stringify(body)

     }).then(resp => resp.json()).catch(error => console.log(body))

    }


    static CreateProfile(body) {

      return fetch(`http://127.0.0.1:8004/api/applications/customer/update/`, {
         'method':'PUT',
         headers: {
             'Content-Type':'application/json',
             'Authorization': `JWT ${localStorage.getItem('access')}`
           }, 
           body:JSON.stringify(body)
 
      }).then(resp => resp.json()).catch(error => console.log(body))
 
     }

    static DeleteApplication(application_id) {

        return fetch(`http://127.0.0.1:8004/api/applications/applications/delete/${application_id}`, {
          'method':'DELETE',
          headers: {
              'Content-Type':'application/json',
              'Authorization': `JWT ${localStorage.getItem('access')}`
            }
  
       })
  
      
    }


}