import React from 'react';
import ReactCSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup';


export default class TweetKutulari extends React.Component {

  render(){
    const twetKutulari = this.props.tweetler.map((tweet)=>{
      return(
        <TweetKutu key={tweet.id} tweet={tweet}/>
      );
    });

    return(
      <div className="row">
        <div className="col-md-12">
          <ReactCSSTransitionGroup className="twet-kutulari" transitionName="ornek" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
            {twetKutulari}
          </ReactCSSTransitionGroup>
        </div>
      </div>
    );
  }
}

class TweetKutu extends React.Component {
  render(){
    const t = this.props.tweet;
    const usrPage = "https://twitter.com/"+t.user.screen_name;
    const usrText = usrPage+"/status/"+t.id_str;
    return(
      <div className="panel panel-default twetkutu col-md-3">
        <div onClick={goSitePage.bind(this,usrPage)} className="twetkutu-top">
          <div className="twetkutu-username">{t.user.name}</div>
          <div className="twetkutu-screenname">@{t.user.screen_name}</div>
          <div className="twetkutu-date">{saatiDuz(t.created_at)}</div>
        </div>
        <div onClick={goSitePage.bind(this,usrText)} className="twetkutu-text">
          <p>{t.text}</p>
        </div>

      </div>
    );
  }
}

function saatiDuz(time){
  const hourIndex = time.indexOf(":");
  const hourText = time.substr(hourIndex-2,2);
  let newHourInt = (parseInt(hourText)+3)%24;
  const plusIndex = time.indexOf("+");
  const newsaat = time.slice(0,hourIndex-2)+time.slice(plusIndex+6)+" "+newHourInt+time.slice(hourIndex,plusIndex);
  return newsaat;//Sat Jul 23 18:51:45 +0000 2016

}

function goSitePage(site) {
  let tt = window.getSelection();
  if(tt.toString().length<1){
    window.open(site);
  }else{
      console.log("TEXT OLDGUUV");
  }
}
