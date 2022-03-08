import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { makeDataList } from './db';
import { Herb, AddedHerb } from './types';
import { calculatePrice } from './util';

function App() {
  const [herbList, setHerbList] = useState<Herb[]>([]);
  const [searchItem, setSearchItem] = useState<Herb[]>([]);
  const [addLists, setAddLists] = useState<AddedHerb[]>([]);
  const [sumPrice, setSumPrice] = useState<number>(0);

  const nameInput = useRef<HTMLInputElement>(null);
  const weightInput = useRef<HTMLInputElement>(null);

  const searchItems = (e: React.FormEvent<HTMLInputElement>) => {
    setSearchItem(herbList.filter((item) => item.name.includes(e.currentTarget.value)));
  };

  const addOrderList = (orderData: { orderWeight: number; totalPrice: number }) => {
    const newOrder: AddedHerb = {
      ...searchItem[0],
      ...orderData,
    };

    setAddLists([...addLists, newOrder]);
  };
  const resetInput = () => {
    if (nameInput.current) {
      nameInput.current.value = '';
    }

    if (weightInput.current) {
      weightInput.current.value = '';
    }

    setSearchItem([]);
  };
  const enterWeight = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') return;

    if (searchItem.length === 0) return;

    const orderWeight = parseInt(e.currentTarget.value);
    const totalPrice = calculatePrice(orderWeight, searchItem[0].unitPrice);

    addOrderList({ orderWeight, totalPrice });
    resetInput();
  };

  const removeItem = (item: AddedHerb) => {
    const removedList = addLists.filter((prevItem) => prevItem.id !== item.id);

    setAddLists(removedList);
  };

  const sumTotalPrice = (list: AddedHerb[]) => {
    const totalPrice = list.reduce((acc, current) => acc + current.totalPrice, 0);
    setSumPrice(totalPrice);
  };

  useEffect(() => {
    sumTotalPrice(addLists);
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

        <input type={'text'} onChange={searchItems} ref={nameInput} />
        <input type={'text'} onKeyUp={enterWeight} ref={weightInput} />

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
