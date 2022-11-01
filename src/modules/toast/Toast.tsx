import { useCallback, useEffect, useState } from "react";
import "./Toast.css";

type QueueNode = {
  next: QueueNode | null;
  text: string;
};

let queue: QueueNode | null = null;

function pushToast(text: string) {
  const newNode: QueueNode = {
    next: null,
    text,
  };

  if (queue == null) {
    queue = newNode;
  } else {
    let node = queue;
    while (node.next != null) {
      node = node.next;
    }
    node.next = newNode;
  }
}

let counter = 1;

export function Toast() {
  const [visible, setVisible] = useState(false);
  const [render, setRender] = useState(false);
  const [message, setMessage] = useState("");

  const handleClick = useCallback(() => {
    pushToast("Toast number: " + counter++);
    setVisible(true);
  }, []);

  useEffect(() => {
    if (visible) {
      if (queue) {
        setRender(true);
        setMessage(queue.text);
        const timer = setTimeout(() => {
          setVisible(false);
          queue = queue?.next ?? null;
        }, 3000);
        return () => clearTimeout(timer);
      }
    } else if (render) {
      const timer = setTimeout(() => {
        setRender(false);
      }, 300);
      return () => clearTimeout(timer);
    } else if (queue) {
      setVisible(true);
    }
  }, [visible, render]);

  return (
    <div className="container">
      <button className="button" onClick={() => handleClick()}>
        Show toast
      </button>
      <div className="toast-container">
        <ul>
          <li className={visible ? "visible" : ""}>
            {render && (
              <div className="toast" role="alert">
                <span>{message}</span>
              </div>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
}
