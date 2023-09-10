import React from 'react';
import { View, StyleSheet, Text, Dropdown } from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 12,
  },
  dropdown: {
    width: '100%',
    borderRadius: 4,
    backgroundColor: '#fff',
  },
  option: {
    padding: 8,
    fontSize: 14,
    color: '#000',
  },
  selectedOption: {
    fontWeight: 'bold',
  },
});

const DropdownPicker = ({ options, selectedOption }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleChange = option => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <View style={styles.container}>
      <Dropdown
        style={styles.dropdown}
        open={isOpen}
        onClose={() => setIsOpen(false)}
      >
        {options.map(option => (
          <option
            key={option}
            value={option}
            selected={option === selectedOption}
            onClick={handleChange}
          >
            {option}
          </option>
        ))}
      </Dropdown>
    </View>
  );
};

export default DropdownPicker;
