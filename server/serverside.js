
import {TwitDb} from '../libs/publicScripts';

datStream="";
addtoDB = true;


Meteor.startup(() => {
  TwitDb.remove({});
  console.log("Hi, master.");
});

twApi = new TwitMaker({
  consumer_key: "xxx",
  consumer_secret: "xxx",
  access_token: "xxx",
  access_token_secret: "xxxx"
});

Meteor.publish('daDB', function(){
  return TwitDb.find();
});

Meteor.methods({
  'callApi'(){
    return twApi;
  },
  'searchTweets'(aranan){
    //console.log(aranan);
      const asyncTwit = Meteor.wrapAsync(twApi.get,twApi);
      return asyncTwit('search/tweets',{q: aranan+' since:2012-01-01',count:1});
  },
  'doStream'(aranan){
    if(datStream) datStream.stop();

    datStream = twApi.stream('statuses/filter', {track: aranan});
    const asyStream = Meteor.wrapAsync(datStream.on,datStream);
    const stopFak = Meteor.wrapAsync(datStream.stop,datStream);
    asyStream('tweet',(tw)=>{
      if(addtoDB){

          addtoDB=false;
          Meteor.call('TwitDb.add',tw);
          console.log("yep");
          Meteor.setTimeout(()=>{addtoDB=true;},1000);
        }else{
          console.log("nope");
          addtoDB=false;
        }
    });
  },
  'stopStream'(){
    datStream.stop();
    addtoDB=true;
  }

});
