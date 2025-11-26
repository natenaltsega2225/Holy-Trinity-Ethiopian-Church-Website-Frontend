// src/components/sections/OurFaith.jsx
import React from "react";
import "../../styles/ourFaith.css";

const OurFaith = () => {
  return (
    <section className="section-container">
      <div className="section-header">
        <h2>Our Faith</h2>
        <p>
          The Orthodox Creed summarizes what we believe and confess in the Ethiopian Orthodox Tewahedo Church.
        </p>
      </div>

      <div className="faith-content">
        <h3>The Orthodox Creed of Faith</h3>
        <p>
          We believe in one God, God the Father, the Pantocrator, Who created heaven and earth, and all things,
          seen and unseen.
        </p>
        <p>
          We believe in one Lord Jesus Christ, the Only-Begotten Son of God, begotten of the Father before all ages;
          Light of Light, true God of true God, begotten not created, of one essence with the Father, by Whom all
          things were made; Who for us, men, and for our salvation, came down from heaven, and was incarnated of the
          Holy Spirit and of the Virgin Mary, and became man.
        </p>
        <p>
          And He was crucified for us under Pontius Pilate, suffered, and was buried. And on the third day He rose
          from the dead, according to the Scriptures, and ascended into the heavens; and sat at the right hand of His
          Father, and also He is coming again in His glory to judge the living and the dead, whose kingdom has no end.
        </p>
        <p>
          Yes, we believe in the Holy Spirit, the Lord, the Life-Giver, Who proceeds from the Father, Who, with the
          Father and the Son, is worshipped and glorified, Who spoke in the prophets. And in one holy, catholic, and
          apostolic church. We confess one baptism for the remission of sins.
        </p>
        <p>
          We look for the resurrection of the dead, and the life of the coming age. Amen.
        </p>
      </div>
    </section>
  );
};

export default OurFaith;