import AbstractSmartComponent from './abstract-smart-component';
import {filmsModel, userRank} from '../main';
import Chart from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {StatsFilterTypes} from '../const';

const renderDiagram = () => {
  const BAR_HEIGHT = 50;
  const statisticCtx = document.querySelector(`.statistic__chart`);

  // Обязательно рассчитайте высоту canvas, она зависит от количества элементов диаграммы
  statisticCtx.height = BAR_HEIGHT * 5;

  return new Chart(statisticCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: [`Sci-Fi`, `Animation`, `Fantasy`, `Comedy`, `TV Series`],
      datasets: [{
        data: [11, 8, 7, 4, 3],
        backgroundColor: `#ffe800`,
        hoverBackgroundColor: `#ffe800`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 20
          },
          color: `#ffffff`,
          anchor: `start`,
          align: `start`,
          offset: 40,
        }
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#ffffff`,
            padding: 100,
            fontSize: 20
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          barThickness: 24
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false
      }
    }
  });
};

const createStatsItemTemplate = (activeFilterType, isChecked) => {
  const filterTypeArray = activeFilterType.split(`-`);
  filterTypeArray[0] = filterTypeArray[0][0].toUpperCase() + filterTypeArray[0].slice(1);
  const label = filterTypeArray.join(` `);
  return (
    `<input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-${activeFilterType}" value="${activeFilterType}" ${isChecked ? `checked` : ``}>
    <label for="statistic-${activeFilterType}" class="statistic__filters-label">${label}</label>`
  );
};

const createStatsTemplate = (actualUserRank, activeFilterType) => {
  const inputList = (Object.values(StatsFilterTypes)).map((item) => createStatsItemTemplate(item, item === activeFilterType)).join(`\n`);
  return (
    `<section class="statistic">
      <p class="statistic__rank">
        Your rank
        <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
        <span class="statistic__rank-label">${actualUserRank}</span>
      </p>

      <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
        <p class="statistic__filters-description">Show stats:</p>

        ${inputList}
      </form>

      <ul class="statistic__text-list">
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">You watched</h4>
          <p class="statistic__item-text">22 <span class="statistic__item-description">movies</span></p>
        </li>
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">Total duration</h4>
          <p class="statistic__item-text">130 <span class="statistic__item-description">h</span> 22 <span class="statistic__item-description">m</span></p>
        </li>
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">Top genre</h4>
          <p class="statistic__item-text">Sci-Fi</p>
        </li>
      </ul>

      <div class="statistic__chart-wrap">
        <canvas class="statistic__chart" width="1000"></canvas>
      </div>

    </section>`
  );
};

export default class Stats extends AbstractSmartComponent {
  constructor() {
    super();
    this._userRank = null;
    this._filmsData = null;
    this._activeFilterType = StatsFilterTypes.ALL;

    this._handleClickItem = this._handleClickItem.bind(this);
  }

  getTemplate() {
    return createStatsTemplate(this._userRank, this._activeFilterType);
  }

  renderer() {
    this._filmsData = filmsModel.getFilms();
    console.log(this._filmsData);
    this._userRank = userRank.userRank;
    renderDiagram();
  }

  show() {
    this.renderer();
    this._addItemClickListeners();
    super.show();
  }

  _addItemClickListeners() {
    const inputList = [...this.getElement().querySelectorAll(`.statistic__filters-input`)];
    inputList.forEach((item) => {
      item.addEventListener(`change`, this._handleClickItem);
    });
  }

  _handleClickItem(evt) {
    this._activeFilterType = evt.target.value;
    this.rerender();
  }

  rerender() {
    this._userRank = userRank.userRank;
    super.rerender();
    this.renderer();
  }

  recoverListeners() {
    this._addItemClickListeners();
  }
}
