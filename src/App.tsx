import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: antiquewhite;
  display: flex;
`;

const Section = styled.section`
  width: 50%;
  height: 100%;
`;

const Lists = styled.div`
  display: flex;
  flex-direction: column;
`;

interface Item {
  id: number;
  name: string;
  unitPrice: number;
}

interface AddedItem extends Item {
  totalPrice: number;
  orderWeight: number;
}
const mock: Item[] = [
  { id: 1, name: '맥문동', unitPrice: 1000 },
  { id: 2, name: '천문동', unitPrice: 3000 },
  { id: 3, name: '부자', unitPrice: 5000 },
  { id: 4, name: '황기', unitPrice: 6000 },
];

function App() {
  const [lists, setLists] = useState<Item[]>([]);
  const [addLists, setAddLists] = useState<AddedItem[]>([]);
  const [sumPrice, setSumPrice] = useState<number>(0);

  const searchItems = (e: React.FormEvent<HTMLInputElement>) => {
    setLists(mock.filter((item) => item.name.includes(e.currentTarget.value)));
  };

  const enterWeight = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') return;

    if (lists.length === 0) return;
    console.log(lists[0].name);
    console.log(lists[0].unitPrice);

    const totalPrice = parseInt(e.currentTarget.value) * lists[0].unitPrice;
    const newOrder: AddedItem = {
      ...lists[0],
      orderWeight: parseInt(e.currentTarget.value),
      totalPrice,
    };

    setAddLists([...addLists, newOrder]);
    setSumPrice((prev) => prev + totalPrice);
  };
  return (
    <Container>
      <Section>
        <button>약재 불러오기</button>

        <input type={'text'} onChange={searchItems} />
        <input type={'text'} onKeyUp={enterWeight} />

        <Lists>
          {lists.map((item) => {
            return <span>{item.name}</span>;
          })}
        </Lists>
      </Section>
      <Section>
        <Lists>
          {addLists.map((item) => {
            return (
              <span>
                {item.name} {item.orderWeight} {item.totalPrice}
              </span>
            );
          })}
          <span>{sumPrice}</span>
        </Lists>
      </Section>
    </Container>
  );
}

export default App;
