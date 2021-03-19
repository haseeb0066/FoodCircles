exports.domain = "https://foodtiger.site/api/v2";
exports.APP_SECRET="app_secret"; //Your app secret - same as in the .env file in your web project 
exports.APP_NAME="Food Tiger";

exports.SINGLE_MODE=false;
exports.SINGLE_MODE_ID=1;
exports.SINGLE_MODE_NAME="Restaurant Name";

exports.MULTI_CITY=true;

//Currency
exports.currency="USD";
exports.currencySign="$";

//COD setup
exports.enableCOD=true;  //Cash on deliver

//Stripe settup
exports.enableStripe=true; 
exports.stripePublishKey="pk_test_Uxj4Pt9ukgWJJyZG73NCeVgs";

//Other payment gateways
exports.enablePayPal=true; 
exports.enableMollie=true; 
exports.enablePayStack=true; 

//OneSignal APP KEY
exports.ONESIGNAL_APP_ID="YOUR_ONESIGNAL_APP_ID";

//Google setup
exports.GOOGLE_API_KEY="AIzaSyAKwIV-6y31LwzBieBhJqAztrZL9C76T7Y";
exports.queryTypes="address"
exports.queryCountries=['mk']; //{['pl', 'fr']}


/*
    searchRadius={500}
    searchLatitude={51.905070}
    searchLongitude={19.458834}
*/
exports.searchLatitude=null;
exports.searchLongitude=null;
exports.searchRadius=null;