import React from "react";
import { Button, TextInput, View } from "react-native";
import { useStoreManager } from "@axioma/core";

export const AddTodoScreen: React.FC = () => {
    const [title, setTitle] = React.useState('');
    const { addTodo } = useStoreManager();
    return (
        <View>
            <TextInput
                placeholder="Todo Title"
                value={title}
                onChangeText={setTitle}
            />
            <Button title="Add Todo" onPress={() => addTodo(title)} />
        </View>
    );
}