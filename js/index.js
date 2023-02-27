let locationInput = document.querySelector("#location");
let find = document.querySelector("#find");
let navButtons = Array.from(document.querySelectorAll(".navbar ul li a "));
let todayDate = new Date();
let todaynumber = todayDate.getDay();
let tomorrow = todaynumber + 1;
let afterTomorrow = todaynumber + 2;
let dayname;

for (let i = 0; i < navButtons.length; i++) {
  navButtons[i].addEventListener("mousemove", (e) => {
    e.target.classList.add("border", "border-primary", "rounded-pill");
  });
}
for (let i = 0; i < navButtons.length; i++) {
  navButtons[i].addEventListener("mouseleave", (e) => {
    e.target.classList.remove("border");
  });
}
for (let i = 0; i < navButtons.length; i++) {
  navButtons[i].addEventListener("click", (e) => {
    e.target.classList.add("active");
  });
}
locationInput.addEventListener("input", () => {
  getdata(locationInput.value);
});
let contents = document.querySelector("#contents");
find.addEventListener("click", () => {
  getdata(locationInput.value);
});

function getDayname(dayNumber) {
  if (dayNumber === 7) {
    dayNumber = 0;
  } else if (dayNumber === 8) {
    dayNumber = 1;
  }
  switch (dayNumber) {
    case 1:
      dayname = "monday";
      break;
    case 2:
      dayname = "Tuesday";
      break;
    case 3:
      dayname = "Wednesday";
      break;
    case 4:
      dayname = "Thursday";
      break;
    case 5:
      dayname = "Friday";
      break;
    case 6:
      dayname = "saturday";
      break;
    case 0:
      dayname = "sunday";
      break;
  }
  console.log(dayNumber);
  return dayname;
}

async function getdata(Location) {
  let API = `http://api.weatherapi.com/v1/forecast.json?key=4e1447a8607e45c9886110610232002&q=${Location}&days=3&aqi=yes&lang=en`;
  let fetching = await fetch(API);
  let result = await fetching.json();
  console.log(result);
  let DaysArray = [];

  contents.innerHTML = `
 <div class='col-md-4'>
<div class='today px-5'>
<div class='d-flex justify-content-between weekday'>
<span> <h5>${getDayname(todaynumber)}</h5>
</span>
<span>
<h5>
${result.forecast.forecastday[0].date}

</h5>
</span>
</div>
<p > ${result.location.name}
</p>

<span id='currentdeg'>${result.current.temp_c} &#8451</span>
<span class='fs-1'><img width=100px src=https:${
    result.current.condition.icon
  }> </span>

<h5>${result.current.condition.text}</h5>
<div class="d-flex justify-content-between ">
<span> <i class="fa-solid fa-wind"></i> ${result.current.gust_kph}KPH </span>
<span><i class="fa-solid fa-droplet-percent"></i>${
    result.current.humidity
  } % </span>
</div>
</div>

 
 </div>
 <div class='col-md-4'>
 <div class='tomorrow px-5 text-danger'>
 <div class='d-flex justify-content-between weekday'>
<span> <h5>${getDayname(tomorrow)}</h5>
</span>
<span>
<h5>
${result.forecast.forecastday[0].date}

</h5>
</span>
</div>
<span><img src=https:${
    result.forecast.forecastday[1].day.condition.icon
  }> </span>
 <h3>${result.forecast.forecastday[1].day.maxtemp_c}</h3>
<h5>${result.forecast.forecastday[1].day.mintemp_c}</h5>
<h5>${result.forecast.forecastday[1].day.condition.text}</h5>
 </div>todaynumber

</div>

 <div class='col-md-4'>
 <div class='after_tomorrow px-5'>
 <div class='d-flex justify-content-between weekday'>
<span> <h5>${getDayname(afterTomorrow)}</h5>
</span>
<span>
<h5>
${result.forecast.forecastday[0].date}

</h5>
</span>
</div>
<span><img src=https:${
    result.forecast.forecastday[2].day.condition.icon
  }> </span>
 <h3>${result.forecast.forecastday[2].day.maxtemp_c}</h3>
<h5>${result.forecast.forecastday[2].day.mintemp_c}</h5>
<h5>${result.forecast.forecastday[2].day.condition.text}</h5>


</div>

 
 </div>



  
  `;
}
getdata("Cairo");
console.log(getDayname(tomorrow));
