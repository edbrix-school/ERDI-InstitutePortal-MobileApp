import { Text, View, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from '../../store/features/counterSlice';

export default function Index() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24 }}>{count}</Text>
      <View style={{ flexDirection: 'row', marginTop: 20 }}>
        <Button title="Increment" onPress={() => dispatch(increment())} />
        <View style={{ width: 20 }} />
        <Button title="Decrement" onPress={() => dispatch(decrement())} />
      </View>
    </View>
  );
}
