<style src="./Itinerary.scss" module lang="scss"></style>
<script src="./Itinerary.js"></script>

<template>
  <div :class="[$style.itinerary, 'wrapper']">
    <div :class="[$style.modeSelector]">
      <h4 :class="['heading-03', $style.modeHeader]">Transportation mode to the airport</h4>
      <ul :class="$style.selector">
        <li :class="[$style.item, {[$style.active]: mode === 'car'}, 'heading-04']" @click="selectMode('car')">Car</li>
        <li :class="[$style.item, {[$style.active]: mode === 'public'}, 'heading-04']" @click="selectMode('public')">Public <br>Transport</li>
        <li :class="[$style.item, {[$style.active]: mode === 'bike'}, 'heading-04']" @click="selectMode('bike')">Bike</li>
        <li :class="[$style.item, {[$style.active]: mode === 'walk'}, 'heading-04']" @click="selectMode('walk')">Walk</li>
      </ul>
    </div>
    <div :class="$style.travelWrapper">
      <h3 :class="[$style.title, 'heading-02']">Your itinerary</h3>
      <ul :class="[$style.travelPlan]">
        <li :class="$style.travelItem">
          <div :class="$style.content">
            <h4 :class="['heading-05', $style.itemTitle]">Travel to the airport</h4>
            <p :class="['copy-03', $style.itemCopy]">
              Leave at: <span :class="'bold'">09:30</span><br><br>
              Travel from: <br>
              <span :class="'bold'">{{result.settings.address}}</span> <br><br>
              Travel mode: <span :class="'bold'">{{mode}}</span>
            </p>
          </div>
          <span :class="['heading-04', $style.time]">09:30</span>
        </li>

        <li :class="$style.travelItem">
          <div :class="$style.content">
            <h4 :class="['heading-05', $style.itemTitle]">Arrival at the airport</h4>
            <p :class="['copy-03', $style.itemCopy]">
              Arrival time: <span :class="'bold'">10:00</span><br><br>
              Waiting time: <span :class="'bold'">2:00</span> <br><br>
              Check-in at the airport: <span :class="'bold'">{{transformBoolean(result.settings.checkIn)}}</span><br><br>
              Checked baggage: <span :class="'bold'">{{transformBoolean(result.settings.baggage)}}</span><br><br>
              Priority ticket: <span :class="'bold'">{{transformBoolean(result.settings.priority)}}</span><br><br>
              Extra lounge time: <span :class="'bold'">{{returnExtraTime(result.settings.extraTime)}}</span>
            </p>
          </div>
          <span :class="['heading-04', $style.time]">09:30</span>
        </li>

        <li :class="$style.travelItem">
          <div :class="$style.content">
            <h4 :class="['heading-05', $style.itemTitle]">Expected boarding</h4>
            <p :class="['copy-03', $style.itemCopy]">
              Boaring time: <span :class="'bold'">{{returnBoarding(result.flight_info.data[0].expectedTimeBoarding)}}</span><br><br>
              Gate: <span :class="'bold'">{{result.flight_info.data[0].gate}}</span>
            </p>
          </div>
          <span :class="['heading-04', $style.time]">{{returnBoarding(result.flight_info.data[0].expectedTimeBoarding)}}</span>
        </li>

        <li :class="$style.travelItem">
          <div :class="$style.content">
            <h4 :class="['heading-05', $style.itemTitle]">Departure</h4>
            <p :class="['copy-03', $style.itemCopy]">
              Departure time: <span :class="'bold'">{{returnBoarding(result.flight_info.data[0].scheduleDateTime)}}</span><br><br>
              Destination: <span :class="'bold'">{{result.flight_info.data[0].route.destinations[0]}}</span>
            </p>
          </div>
          <span :class="['heading-04', $style.time]">{{returnBoarding(result.flight_info.data[0].scheduleDateTime)}}</span>
        </li>

        <li :class="$style.travelItem">
          <div :class="$style.content">
            <h4 :class="['heading-05', $style.itemTitle]">Arrival at the ariport</h4>
            <p :class="['copy-03', $style.itemCopy]">
              Flight time: <span :class="'bold'">1:00</span>
            </p>
          </div>
          <span :class="['heading-04', $style.time]">13:10</span>
        </li>
      </ul>
    </div>
  </div>
</template>
