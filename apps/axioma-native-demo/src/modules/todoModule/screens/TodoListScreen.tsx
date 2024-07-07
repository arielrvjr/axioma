import { FlatList, View, Text, Button } from "react-native";
import { useStoreManager } from "@axioma/core";

export const TodoListScreen: React.FC = () => {
    const { todos, toggleTodo } = useStoreManager();
    return (
        <FlatList
            data={todos}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <View>
                    <Text
                        style={{
                            textDecorationLine: item.completed ? 'line-through' : 'none',
                        }}
                    >
                        {item.title}
                    </Text>
                    <Button
                        title={item.completed ? 'Undo' : 'Complete'}
                        onPress={() => toggleTodo(item.id)}
                    />
                </View>
            )}
        />
    );
};