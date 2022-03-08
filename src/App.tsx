import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { makeDataList } from './db';
import { Herb, AddedHerb } from './types';
import { calculatePrice, convertNumberFormat } from './util';

function App() {
  const [herbList, setHerbList] = useState<Herb[]>([]);
  const [searchItem, setSearchItem] = useState<Herb[]>([]);
  const [addLists, setAddLists] = useState<AddedHerb[]>([]);
  const [sumPrice, setSumPrice] = useState<number>(0);

  const nameInput = useRef<HTMLInputElement>(null);
  const weightInput = useRef<HTMLInputElement>(null);

  // TODO : 파일 path 저장해두고 버튼만 누르게
  const handleFile = async (file: FileList | null) => {
    if (!file) return;

    const data = await makeDataList(file[0]);
    setHerbList(data);
    console.log(data);
  };

  // TODO : lodash 이용하기
  const searchItems = (e: React.FormEvent<HTMLInputElement>) => {
    setSearchItem(herbList.filter((item) => item.name.includes(e.currentTarget.value)));
  };

  const addOrderList = (orderData: { orderWeight: number; totalPrice: number }) => {
    const newOrder: AddedHerb = {
      ...searchItem[0],
      ...orderData,
    };

    setAddLists([newOrder, ...addLists]);
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

  return (
    <Container>
      <Section>
        <InputSection>
          <button>약재 불러오기</button>
          <input
            type='file'
            accept='.xlsx, .xlsb, .xlsm, .xls, .xml'
            onChange={(e) => handleFile(e.currentTarget.files)}
          />

          <input type={'text'} onChange={searchItems} ref={nameInput} />
          <input type={'text'} onKeyUp={enterWeight} ref={weightInput} />
        </InputSection>
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
      <RightSection>
        <TotalPriceCard>
          <span>₩ {convertNumberFormat(sumPrice)}원</span>
          <span>{addLists.length}건</span>
        </TotalPriceCard>
        <Bill>
          {addLists.map((item) => {
            return (
              <BillItem key={item.id} onClick={(e) => removeItem(item)}>
                <Name>{item.name}</Name>
                <Prices>
                  <span>{convertNumberFormat(item.totalPrice)}</span>
                  <span>
                    {item.orderWeight} x {convertNumberFormat(item.unitPrice)}
                  </span>
                </Prices>
              </BillItem>
            );
          })}
        </Bill>
      </RightSection>
    </Container>
  );
}

export default App;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(217deg, #e3dfd7, #e3d5d3);
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 50% 50%;
  align-items: center;
  font-family: 'Rubik', sans-serif;
`;

const Section = styled.section`
  box-sizing: inherit;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
`;

const RightSection = styled(Section)`
  background: linear-gradient(
    90deg,
    rgba(254, 254, 254, 1) 0%,
    rgba(248, 246, 245, 1) 50%,
    rgba(248, 246, 245, 1) 100%
  );
  width: 60%;
  border-radius: 3rem;
  height: 90%;
  align-self: center;
  justify-self: center;
  overflow: hidden;
  box-shadow: 6px 10px 23px 0px rgba(0, 0, 0, 0.25);
  transition: 1s all ease;
`;

const Lists = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
`;

const InputSection = styled.div``;

const TotalPriceCard = styled.div`
  width: 100%;
  height: 15rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  span:nth-child(1) {
    font-size: 2rem;
    font-weight: 650;
    margin-top: 1rem;
  }

  span:nth-child(2) {
    font-size: 1rem;
    margin: 0.5rem;
    color: RGB(154, 154, 155);
  }
`;

const Bill = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
`;
const BillItem = styled.div`
  background-color: white;
  border-radius: 1rem;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  margin: 0.5rem;
  &:hover {
    background-color: rgba(226, 222, 214, 0.5);
  }
`;

const Name = styled.span`
  font-size: 1rem;
  font-family: 'Gowun Batang', serif;
`;

const Prices = styled.div`
  display: flex;
  flex-direction: column;
  text-align: right;

  span:nth-child(1) {
    color: #bda5ab;
    font-size: 1rem;
    font-weight: 550;
  }

  span:nth-child(2) {
    color: RGB(154, 154, 155);
    font-size: 0.75rem;
  }
`;
