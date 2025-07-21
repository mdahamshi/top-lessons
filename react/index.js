import { useState } from "react";
import { letters } from "./data.js";
import Letter from "./Letter.js";

export default function MailClient() {
  const [selectedId, setSelectedId] = useState(new Set());

  // TODO: allow multiple selection
  const selectedCount = selectedId.size;

  function handleToggle(toggledId) {
    let newIds = new Set(selectedId);
    if (newIds.has(toggledId)) {
      newIds.delete(toggledId);
    } else {
      newIds.add(toggledId);
    }
    setSelectedId(newIds);
  }

  return (
    <>
      <h2>Inbox</h2>
      <ul>
        {letters.map((letter) => (
          <Letter
            key={letter.id}
            letter={letter}
            isSelected={selectedId.has(letter.id)}
            onToggle={handleToggle}
          />
        ))}
        <hr />
        <p>
          <b>You selected {selectedCount} letters</b>
        </p>
      </ul>
    </>
  );
}


import './css/Card.css'
export default function Card() {
  
}