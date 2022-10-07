
module.exports.getDate=getDate;

function getDate(){
  let today=new Date();

  let options={
   weekday:"long",
   day:"numeric",
   month:"long",
  };

  let day=today.toLocaleString("eng-IN",options);
  return day;
}

module.exports.getDay=getDay;
function getDay(){
  let today=new Date();

  let options={
   weekday:"long",
  };

  return today.toLocaleString("eng-IN",options);

}
