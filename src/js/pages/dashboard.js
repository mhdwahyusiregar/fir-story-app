import Stories from '../network/stories';

const Dashboard = {
  async init() {
    await this._initialData();
  },

  async _initialData() {
    const cardContainer = document.getElementById('card-container');
    try {
      const stories = await Stories.getAll();

      const storyCards = await Promise.all(
        stories.map(async (story) => {
          try {
            const url = await Stories.getEvidenceURL(story.photo);
            return `
            <div class="col-md-4 mb-3"> 
              <div class="card card--trapezium">
                <img src="${url}" class="card-img-top">
                <div class="card-body card__body">
                 
                  <p class="card-text card__body__text">${story.description}</p>
                  <button class="btn btn-primary">See Details</button>
                </div>
              </div> 
            </div>
          `;
          } catch (error) {
            console.error(error);
            return '';
          }
        }),
      );

      cardContainer.innerHTML = storyCards.join('');
    } catch (error) {
      console.error(error);
    }
  },
};

export default Dashboard;
