export function seedDatabase(firebase) {
  const users = [
    {
      userId: "1taAeTjKk6fYkleXX0vtUbuOmTa2",
      username: "Mohamed",
      fullName: "Mohamed Hassan",
      emailAddress: "hamobos499@gmail.com",
      following: ["2"],
      followers: ["2", "3", "4"],
      dateCreated: Date.now(),
    },
    {
      userId: "2",
      username: "Bayoumi",
      fullName: "Abdelrahman Bayoumi",
      emailAddress: "sci.abdelrahmanbayoumi2018@alexu.edu.eg",
      following: [],
      followers: ["1taAeTjKk6fYkleXX0vtUbuOmTa2"],
      dateCreated: Date.now(),
    },
    {
      userId: "3",
      username: "Ehab",
      fullName: "Ehab Hassan",
      emailAddress: "ehab_tobes@yahoo.com",
      following: [],
      followers: ["1taAeTjKk6fYkleXX0vtUbuOmTa2"],
      dateCreated: Date.now(),
    },
    {
      userId: "4",
      username: "Amgad",
      fullName: "Mohamed Amgad",
      emailAddress: "sci.mohamedamgad2018@alexu.edu.eg",
      following: [],
      followers: ["1taAeTjKk6fYkleXX0vtUbuOmTa2"],
      dateCreated: Date.now(),
    },
  ];

  for (let k = 0; k < users.length; k++) {
      console.log('ok')
    firebase.firestore().collection("users").add(users[k]);
  }

  for (let i = 1; i <= 5; ++i) {
    firebase
      .firestore()
      .collection("photos")
      .add({
        photoId: i,
        userId: "2",
        imageSrc: `/images/users/raphael/${i}.jpg`,
        caption: "Saint George and the Dragon",
        likes: [],
        comments: [
          {
            displayName: "Ehab",
            comment: "Love this place, looks like my animal farm!",
          },
          {
            displayName: "Bayoumi",
            comment: "Would you mind if I used this picture?",
          },
        ],
        userLatitude: "40.7128°",
        userLongitude: "74.0060°",
        dateCreated: Date.now(),
      });
  }
}
