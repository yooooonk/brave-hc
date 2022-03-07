import React, { useState } from 'react';
import styled from 'styled-components';
import { mock, makeDataList } from './db';
import { Herb, AddedHerb } from './types';

function App() {
  const [lists, setLists] = useState<Herb[]>([]);
  const [addLists, setAddLists] = useState<AddedHerb[]>([]);
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
    const newOrder: AddedHerb = {
      ...lists[0],
      orderWeight: parseInt(e.currentTarget.value),
      totalPrice,
    };

    setAddLists([...addLists, newOrder]);
    setSumPrice((prev) => prev + totalPrice);
  };

  const removeItem = (item: AddedHerb) => {
    console.log(item.id);
    console.log(addLists);
    const removedList = addLists.filter((prevItem) => prevItem.id !== item.id);
    console.log(removedList);

    setAddLists(removedList);
    setSumPrice((prev) => prev - item.totalPrice);
  };
  //
  // useEffect(() => {
  //   const totalPrice = addLists.reduce((acc) => acc + item.totalPrice);
  //   setSumPrice();
  // }, [addLists]);

  const handleFile = async (file: FileList | null) => {
    if (!file) return;

    const data = await makeDataList(file[0]);
    console.log(data);
  };
  return (
    <Container>
      <Section>
        <button>약재 불러오기</button>
        <input
          type='file'
          accept='.xlsx, .xlsb, .xlsm, .xls, .xml'
          onChange={(e) => handleFile(e.currentTarget.files)}
        />

        <input type={'text'} onChange={searchItems} />
        <input type={'text'} onKeyUp={enterWeight} />

        <Lists>
          {lists.map((item) => {
            return <span key={item.id}>{item.name}</span>;
          })}
        </Lists>
      </Section>
      <Section>
        <Lists>
          {addLists.map((item) => {
            return (
              <Item key={item.id} onClick={(e) => removeItem(item)}>
                {item.name} {item.orderWeight} {item.totalPrice}
              </Item>
            );
          })}
          <span>{sumPrice}</span>
        </Lists>
      </Section>
    </Container>
  );
}

export default App;

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

const Item = styled.span`
  background-color: white;
  border-radius: 1rem;
  cursor: pointer;
`;
