import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { mock, makeDataList } from './db';
import { Herb, AddedHerb } from './types';

function App() {
  const [herbList, setHerbList] = useState<Herb[]>([]);
  const [searchItem, setSerachItem] = useState<Herb[]>([]);
  const [addLists, setAddLists] = useState<AddedHerb[]>([]);
  const [sumPrice, setSumPrice] = useState<number>(0);

  const searchItems = (e: React.FormEvent<HTMLInputElement>) => {
    setSerachItem(herbList.filter((item) => item.name.includes(e.currentTarget.value)));
  };

  const enterWeight = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') return;

    if (searchItem.length === 0) return;
    console.log(searchItem[0].name);
    console.log(searchItem[0].unitPrice);

    const totalPrice = parseInt(e.currentTarget.value) * searchItem[0].unitPrice;
    const newOrder: AddedHerb = {
      ...searchItem[0],
      orderWeight: parseInt(e.currentTarget.value),
      totalPrice,
    };

    setAddLists([...addLists, newOrder]);
  };

  const removeItem = (item: AddedHerb) => {
    console.log(item.id);
    console.log(addLists);
    const removedList = addLists.filter((prevItem) => prevItem.id !== item.id);
    console.log(removedList);

    setAddLists(removedList);
  };

  const calculateTotalPrice = (list: AddedHerb[]) => {
    const totalPrice = list.reduce((acc, current) => acc + current.totalPrice, 0);
    setSumPrice(totalPrice);
  };
  useEffect(() => {
    calculateTotalPrice(addLists);
  }, [addLists]);

  const handleFile = async (file: FileList | null) => {
    if (!file) return;

    const data = await makeDataList(file[0]);
    setHerbList(data);
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
          {searchItem.map((item) => {
            return (
              <span key={item.id}>
                {item.name} {item.unitPrice}
              </span>
            );
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
