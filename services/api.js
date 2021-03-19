import config from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Gets list of cities
 * @param {Function} callback 
 */
function getCities(callback) {
  console.log(config.domain+'/client/vendor/cities');
  fetch(config.domain+'/client/vendor/cities')
      .then(response => response.json())
      .then(responseJson => {
        console.log("Resp")
         callback(responseJson.data)
      })
      .catch(error => {
        console.error(error);
      });
}
exports.getCities=getCities;


/**
 * Gets list of restaurants
 * @param {Function} callback 
 */
function getRestaurants(city_id,callback) {
    var link=config.domain+'/client/vendor/list/'+(city_id?city_id:"none");
    console.log(link);
     fetch(link)
         .then(response => response.json())
         .then(responseJson => {
            callback(responseJson.data)
         })
         .catch(error => {
           console.error(error);
         });
 }
 exports.getRestaurants=getRestaurants;


 /**
 * Gets list of restaurants
 * @param {Function} callback 
 */
function getRestaurantInfo(id,callback) {
  var link=config.domain+'/client/vendor/'+id+'/hours'
  console.log(link);
  fetch(link)
      .then(response => response.json())
      .then(responseJson => {
         callback(responseJson.data)
      })
      .catch(error => {
        console.error(error);
      });
}
exports.getRestaurantInfo=getRestaurantInfo;



 /**
 * Gets list of restaurants
 * @param {Function} callback 
 */
function getDeliveryFee(restaurant_id,address_id,callback) {
  var link=config.domain+'/client/vendor/deliveryfee/'+restaurant_id+'/'+address_id
  console.log(link);
  fetch(link)
      .then(response => response.json())
      .then(responseJson => {
         callback(responseJson.fee)
      })
      .catch(error => {
        console.error(error);
      });
}
exports.getDeliveryFee=getDeliveryFee;


 

/**
 * Get the restaurants items
 * @param {number} id The restaurant is
 * @param {Functino} callback 
 */
 function getItemsInRestaurant(id,callback){
  var link=config.domain+'/client/vendor/'+id+'/items'
   console.log(link);
    fetch(link)
       .then(response => response.json())
       .then(responseJson => {
            callback(responseJson.data)
       })
       .catch(error => {
         console.error(error);
       });
   }
exports.getItemsInRestaurant=getItemsInRestaurant;


/**
 * Place order
 * @param {Object} paymentObject 
 * @param {function} callback 
 */
async function placeOrder(paymentObject,callback){
  var token = await AsyncStorage.getItem('token','');
  console.log("---- PAYMENT OBJECT ----");

  //Modify the payment object so instead variant:{object}, we have variant:id
  paymentObject.items.forEach(function(item, index) {
    if(item.variant){
      paymentObject.items[index]['variant'] = item.variant.id;
    }
    
  });


  console.log(paymentObject);
  //paymentObject.api_token=token;
  var link=config.domain+'/client/orders?api_token='+token;
  console.log(link);
  fetch(link, {
   method: 'POST',
   headers: {
     Accept: 'application/json',
     'Content-Type': 'application/json',
   },
   body: JSON.stringify(paymentObject),
 }).then((response) => response.json())
 .then((responseJson) => {
   callback(responseJson);
 }).catch(error => {
   console.error(error);
 });
}
exports.placeOrder=placeOrder;


register = async () =>{
  const data = { 
    name: this.state.name,
    email:this.state.email,
    password:this.state.password,
    phone:this.state.phone,
    app_secret:"",
  };
   fetch(config.domain+'/client/register', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then((response) => response.json())
  .then((responseJson) => {
    console.log(JSON.stringify(responseJson))
    this.setToken(responseJson.token)
  }).catch(error => {
    console.error(error);
  });
}

function registerUser(name,email,password,phone,callback){
  const data = { 
    name: name,
    email:email,
    password:password,
    phone:phone,
    app_secret:config.APP_SECRET,
  };

  var link=config.domain+'/client/auth/register';
  fetch(link, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    }).then((response) => response.json())
    .then((responseJson) => {
      callback(responseJson);
    }).catch(error => {
      console.error(error);
    });

}
exports.registerUser=registerUser;

function loginUser(email,password,callback){
  var link=config.domain+'/client/auth/gettoken';
   fetch(link, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
     email:email,
     password:password
    }),
  }).then((response) => response.json())
  .then((responseJson) => {
    callback(responseJson);
  }).catch(error => {
    console.error(error);
  });
 }
 exports.loginUser=loginUser;


 async function getNotifications(callback){
  var token = await AsyncStorage.getItem('token','');
  var link=config.domain+'/client/notifications?api_token='+token
  console.log(link);
  fetch(link, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }
  }).then((response) => response.json())
  .then((responseJson) => {
    console.log(responseJson);
    if(responseJson.status){
     callback(responseJson.data);
    }else{
      alert(responseJson.message+" "+responseJson.errMsg)
      callback([]);
    }
    
    
  }).catch(error => {
    console.error(error);
  });

 }
 exports.getNotifications=getNotifications;


 async function getOrders(callback){
  var token = await AsyncStorage.getItem('token','');
  
  var link=config.domain+"/client/orders?api_token="+token;
  console.log(link);
  fetch(link, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }
  }).then((response) => response.json())
  .then((responseJson) => {
    if(responseJson.status){
     callback(responseJson.data);
    }else{
      alert(responseJson.message+" "+responseJson.errMsg)
      callback([]);
    }
    
    
  }).catch(error => {
    console.error(error);
  });

 }
 exports.getOrders=getOrders;


 //

 async function getAddressWithFees(restoid,callback){
  var token = await AsyncStorage.getItem('token','');
  //myaddresses
  var link=config.domain+"/client/addresses/fees/"+restoid+'?api_token='+token
  console.log(link);
  fetch(link, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  }).then((response) => response.json())
  .then((responseJson) => {
    console.log(responseJson);
    if(responseJson.status){
     callback(responseJson.data);
    }else{
      alert(responseJson.message+" "+responseJson.errMsg)
      callback([]);
    }
    
    
  }).catch(error => {
    console.error(error);
  });

 }
 exports.getAddressWithFees=getAddressWithFees;
 
 async function getAddress(callback){
  var token = await AsyncStorage.getItem('token','');
  //myaddresses
  fetch(config.domain+'/myaddresses?api_token='+token, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }
  }).then((response) => response.json())
  .then((responseJson) => {
    console.log(responseJson);
    if(responseJson.status){
     callback(responseJson.data);
    }else{
      alert(responseJson.message+" "+responseJson.errMsg)
      callback([]);
    }
    
    
  }).catch(error => {
    console.error(error);
  });

 }
 exports.getAddress=getAddress;


 async function saveAddress(addressElement,callback){
  var token = await AsyncStorage.getItem('token','');
  var link=config.domain+'/client/addresses?api_token='+token;
  console.log(link);
  console.log(addressElement);
  fetch(link, {
   method: 'POST',
   headers: {
     Accept: 'application/json',
     'Content-Type': 'application/json',
   },
   body: JSON.stringify(addressElement),
 }).then((response) => response.json())
 .then((responseJson) => {
   if(responseJson.status){
    callback(responseJson);
   }else{
     alert(responseJson.message+" "+responseJson.errMsg)
   }
   console.log(responseJson);
   
 }).catch(error => {
   console.error(error);
 });
}
exports.saveAddress=saveAddress;