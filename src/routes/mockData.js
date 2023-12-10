const mockUsers = [
    {
      id: 1,
      name: "User 1",
      lists: [
        {
          id: 1,
          name: "Tesco",
          desc: "Co zítra musím nakoupit",
          items: ["Mléko", "Chléb", "Ovoce"],
        },
        {
          id: 2,
          name: "OBI",
          desc: "Rekonstrukce ložnice",
          items: ["Barva", "Podlahové krytiny", "Žárovky"],
        },
      ],
    },
    {
      id: 2,
      name: "User 2",
      lists: [
        {
          id: 3,
          name: "Vánoce 2023",
          desc: "Můj seznam dárků, co musím koupit do Vánoc",
          items: ["Hračky", "Oblečení", "Elektronika"],
        },
      ],
    },
  ];
  
  export default mockUsers;