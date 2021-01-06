# Github User Directory
### Steps to run the project  
1. Clone the repository.  
2. cd to the project folder.  
3. npm install to install the necessary dependencies provided NodeJS is preinstalled.  
4. npm start to start the local dev server at localhost:3000.  

### Project Description  
Project UI is built using React and Material UI.  
Project purpose is to develop a clean UI to enable travel enthusiasts to search for famous cities around the globe and save the selections locally. The user can also view a list of famous activities that he/she can undertake while on tour, displayed 10 at a time for better user experience.

### Project components  
This project has three main components. The Search component, the Cities component and the Activities component.
#### Search Component    
The search component is used to display a list of suggested cities from local json file on typing or clicking in the searchbar. The user can select a suggestion which gets displayed as a Chip component on the searchbar. The user can also remove the selected cities. The addition/removal of cities in this component is also reflected in the cities component via Redux.
#### Cities Component  
The cities component is used to list the cities selected by the user.  
#### Activities Component  
The activities component is used to load a list of activities that the user may undertake. This data is populated from a REST service and is displayed as a set of 10 activities at a time. The next set of activities will be loaded on scrolling up.
