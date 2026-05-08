import { useExpenses } from '@/context/ExpensesContext';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

export default function AddExpenseScreen() {
  const router = useRouter();
  const { addExpense } = useExpenses();
  
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  const [errors, setErrors] = useState<string[]>([]);

  const handleSave = () => {
    const newErrors: string[] = [];

    if (!description.trim()) {
      newErrors.push('A descrição não pode estar vazia');
    }

    const numValue = parseFloat(value);
    if (!value || isNaN(numValue) || numValue <= 0) {
      newErrors.push('O valor deve ser um número maior que zero');
    }

    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    const success = addExpense(description, parseFloat(value));
    
    if (success) {
      router.back();
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Adicionar Gasto</Text>

      {errors.length > 0 && (
        <View style={styles.errorContainer}>
          {errors.map((error, index) => (
            <Text key={index} style={styles.errorText}>• {error}</Text>
          ))}
        </View>
      )}

      <View style={styles.formGroup}>
        <Text style={styles.label}>Descrição</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: Supermercado, Transporte, Alimentação..."
          value={description}
          onChangeText={setDescription}
          placeholderTextColor="#ccc"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Valor (R$)</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: 25.50"
          value={value}
          onChangeText={setValue}
          keyboardType="decimal-pad"
          placeholderTextColor="#ccc"
        />
      </View>

      <View style={styles.buttonContainer}>
        <Pressable 
          style={[styles.button, styles.saveButton]} 
          onPress={handleSave}
        >
          <Text style={styles.buttonText}>Salvar Gasto</Text>
        </Pressable>

        <Pressable 
          style={[styles.button, styles.cancelButton]} 
          onPress={() => router.back()}
        >
          <Text style={styles.cancelButtonText}>Cancelar</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  errorContainer: {
    backgroundColor: '#ffebee',
    borderLeftWidth: 4,
    borderLeftColor: '#ff0000',
    padding: 12,
    marginBottom: 20,
    borderRadius: 4,
  },
  errorText: {
    color: '#d32f2f',
    fontSize: 14,
    marginVertical: 4,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#fff',
  },
  buttonContainer: {
    marginTop: 30,
    gap: 12,
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
  },
  cancelButton: {
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
});
