import CheckUserAuth from './auth/check-user-auth';
import Stories from '../network/stories';

const Dashboard = {
  async init() {
    CheckUserAuth.checkLoginState();

    await this._initialData();
  },

  async _initialData() {
    try {
      const response = await Stories.getAll();
      const stories = response.data.listStory;
      const storyCards = stories.map((story) => {
        return `
            <div class="col-md-4 mb-3"> 
              <div class="card card--trapezium">
                <img src="${story.photoUrl}" class="card-img-top">
                <div class="card-body card__body">
                  <h5 class="card-title card__body__title">${story.name}</h5>
                  <p class="card-text card__body__text">${story.description}</p>
                  <p class="card-text card__body__text"><small class="text-muted">${new Date(
                    story.createdAt,
                  ).toLocaleDateString()}</small></p>
                  <button class="btn btn-primary">See Details</button>
                </div>
              </div> 
            </div>
          `;
      });
      const storyContainer = document.getElementById('card-container');
      storyContainer.innerHTML = storyCards.join('');
    } catch (error) {
      console.error(error);
    }
  },
};

export default Dashboard;
