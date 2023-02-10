import { StatusBar } from 'expo-status-bar';
import { Modal, StyleSheet,Button, Text, View ,TextInput, FlatList, Pressable} from 'react-native';
import {useState} from 'react';
import ProductList from "./src/screens/ProductList";
import  ProductImage  from './src/screens/ProductText';
import { getStateFromPath } from '@react-navigation/native';

export default function App(props) {
  const route = props.route;
  const nameChuyenMH = route.params.name;
  const data = [
    {
     
     ten: "Trần Ngọc Tiến",
     tuoi: 20,
     diachi: "Nga Sơn",
     std: 123456789,
     email: "tientnph19989",
    },
  ];
  // để danh sách render lại khi có dữ liệu mới thì cần 1 ds đang state
  const[productList, setProducList] = useState(data);
  const [isShowAdd, setShowAdd] = useState(false);
  const[tenValue, setTenValue] = useState('');
  const[editId, setEditId] = useState(0);
  const[tuoiValue, setTuoiValue] = useState('0');
  const[diachiValue, setDiachiValue] = useState('');
  const[stdValue, setSdtValue] = useState('0');
  const[emailValue, setEmailValue] = useState('');


  const handleClose = () => {
    setTenValue('editItem.ten');
    setTuoiValue('editItem.tuoi');
    setEditId(0);
    setDiachiValue('editItem.diachi');
    setSdtValue('editItem.std');
    setEmailValue('editItem.email');
    setShowAdd(false);
  }

  const handleAdd= ()=>{
    // Nếu có editId thì là đang sửa và cần cập nhật phần tử
    if(editId) {
      const newEditPoductList = [...productList];
      for (let i = 0; i < newEditPoductList.length; i++){
        if(newEditPoductList[i].id == editId) {
          newEditPoductList[i].ten = tenValue;
          newEditPoductList[i].tuoi = tuoiValue;
          newEditPoductList[i].diachi = diachiValue;
          newEditPoductList[i].std = stdValue;
          newEditPoductList[i].email = emailValue;

        }
      }
      setProducList(newEditPoductList);
      return handleClose();
    }
    // khi bạn lưu se gọi hàm này
    // 1 định nghĩa object mới sẽ được thêm vào mạng dữ liệu
    const newItem = {
      id: productList.length ==0
        ? 1
         :  productList[productList.length-1].id + 1,
      ten: tenValue,
      tuoi: tuoiValue,
      diachi: diachiValue,
      std: stdValue,
      email: emailValue,
      
    };
    // 2 Thêm phần tử mới vào mảng sau đó cập nhật lại ds
    // ... sẽ lấy ra phần tử của mảng sau đó ghép cùng phần tử mới
    const newProductList = [...productList, newItem];

    // 3 cập nhật ds mới
    setProducList(newProductList);
    handleClose();
    // 4 cập nhật input về ds mặc định và đóng modal
    setTenValue(''); setTuoiValue(0); setDiachiValue(''); setSdtValue(0); setEmailValue(''); setShowAdd(false);
  }

  const handleDelete = (deleteId) => {
    const newProductList = productList.filter(item => item.id !== deleteId)
    setProducList(newProductList);
    return handleClose();
  };
    // hàm sửa chạy khi bấm nút sửa ở từng phần tử
    const handleEdit = (editId) => {
      // 1. Hiển thị modal lên,
       setShowAdd(true);
      // 2. Truyền giá trị cần sửa vào TextInput
      const editItem = productList.find(item => item.id == editId);
      setTenValue(editItem.ten);
      setTuoiValue(editItem.tuoi);
      setEditId(editId);
      setDiachiValue(editItem.diachi);
      setSdtValue(editItem.std);
      setEmailValue(editItem.email);
    };
  
  return (
    <View style={styles.container}>
        <ProductImage/>
      
        
          {/* visible của modal sẽ thể hiện trạng thái ẩn hiện
          Thay thế cho cách dùng toán tử 3 ngôi để ẩn hiênj giao diện */}
          <Modal visible={isShowAdd} animationType="slide"> 
          <View>
          {/* <Text>{nameValue}</Text> */}
          <TextInput placeholder="Tên: "
           value= {tenValue}
           onChangeText={(text) => {setTenValue(text)}} 
           />

           <Text>{tuoiValue}</Text>
          <TextInput placeholder="Tuổi: " keyboardType="numeric"
          value={tuoiValue}
          onChangeText={(text) => {setTuoiValue(text)}}/>

          <TextInput placeholder="Địa chỉ: "
           value= {diachiValue}
           onChangeText={(text) => {setDiachiValue(text)}} 
           />

          <Text>{stdValue}</Text>
          <TextInput placeholder="STD: " keyboardType="numeric"
           value={stdValue}
           onChangeText={(text) => {setSdtValue(text)}} 
           />

          <TextInput placeholder="Email: "
           value= {emailValue}
           onChangeText={(text) => {setEmailValue(text)}} 
           />

          <Button title="Hủy" onPress={() => handleClose()}/>
          <Button title="Lưu" onPress={()=> handleAdd()}/>
        </View>
        </Modal>
        <FlatList
        data={productList}
        renderItem={({item}) => <View>
          <Text>{item.id}</Text>
          <Text>Ten: {item.ten}</Text>
          <Text>Tuoi: {item.tuoi} </Text>
          <Text>Dia chi: {item.diachi} </Text>
          <Text>STD: {item.std} </Text>
          <Text>Email: {item.email} </Text>
          <Pressable onPress={() => {handleEdit(item.id)}}>
            <Text>Sua</Text>
          </Pressable>
          <Pressable onPress={() => {handleDelete(item.id)}}>
            <Text>Xoa</Text>
          </Pressable>

        </View>}
        keyExtractor={(item)=> item.id}
        />
      {/* <ProductList /> */}

      {/* <PI />
      <ProductText name={'Tên SP 1'} desc={123}   />
      <ProductText name={'Tên SP 2'} desc={'123'}  />
      <ProductText name={'Tên SP 3'} desc={'abc'}  /> */}
{/* 
      <Button
        title={'Bấm để Ẩn Hiện giao diện'}
        onPress={() => setShowStatus(!showStatus)}
      />
      {
        showStatus
          ? <>
              <Text style={styles.text}>Count: {count}</Text>
              <Button
                title={'Bấm để tăng gt count'}
                onPress={() => tangCount()}
              />
            </>
          : null
      }


      <Text style={styles.text}>Count state: {countState}</Text>
      <Button
        title={'Bấm để tăng gt countState'}
        onPress={() => setCountState(countState + 1)}
      /> */}


      {/* Đưa giá trị biến vào trong cặp ngoặc nhọn {} */}
      {/* <Text style={styles.text}> {name} - PH12345</Text> */}
      {/* <Text style={styles.text}>
        {arrowShowData('Email', 'tuannda3@fe.edu.vn')}
      </Text>
      <Text style={styles.text}>
        {arrowMiniShowData('SDT', '0392871868')}
      </Text> */}
      {/* Alt + Shift + Mũi tên xuống: để sao chép dòng */}
      {/* Ctrl + D: Bôi vào những phần nội dung giống nhau */}
      {/* Ctrl + X: Nếu không bôi văn bản thì sẽ xoá cả dòng */}
      <StatusBar style="auto" />
    </View>
  );

};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 50,
  },
  text: {
    // tên của phần thay đổi giao diện
    color: "red",
    fontStyle: "italic",
    fontWeight: "bold",
    fontSize: 30,
  },
});

