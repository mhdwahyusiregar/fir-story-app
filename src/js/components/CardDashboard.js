import { html } from 'lit';
import LitWithoutShadowDom from './base/LitWithoutShadowDom';

const API_URL =
  'https://raw.githubusercontent.com/dicodingacademy/a565-webtools-labs/099-shared-files/proyek-awal/DATA.json';

class CardContainer extends LitWithoutShadowDom {
  static get properties() {
    return {
      stories: { type: Array },
    };
  }

  constructor() {
    super();
    this.stories = [];
  }

  connectedCallback() {
    super.connectedCallback();
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        this.stories = data.listStory;
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  render() {
    return html`
      ${this.stories.map((story) => {
        return html`
          <div class="col-md-4 mb-3">
            <div class="card card--trapezium">
              <img src="${story.photoUrl}" class="card-img-top" />
              <div class="card-body card__body">
                <h5 class="card-title card__body__title">${story.name}</h5>
                <p class="card-text card__body__text">${story.description}</p>
                <p class="card-text card__body__text">
                  <small class="text-muted"
                    >${new Date(story.createdAt).toLocaleDateString()}</small
                  >
                </p>
                <button class="btn btn-primary">See Details</button>
              </div>
            </div>
          </div>
        `;
      })}
    `;
  }
}

customElements.define('card-container', CardContainer);
