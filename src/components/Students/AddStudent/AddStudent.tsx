'use client';

import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { getGroupsApi } from '@/api/groupsApi';
import type StudentInterface from '@/types/StudentsInterface';
import type GroupInterface from '@/types/GroupInterface';
import styles from './AddStudent.module.scss';

interface AddStudentProps {
  onAdd: (student: Omit<StudentInterface, 'id'> & { uuid?: string }) => void;
}

const AddStudent = ({ onAdd }: AddStudentProps): React.ReactElement => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [groups, setGroups] = useState<GroupInterface[]>([]);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    middleName: '',
    groupId: ''
  });

  const handleOpen = async () => {
    if (!isOpen) {
      try {
        const groupsData = await getGroupsApi();
        setGroups(groupsData);
      } catch (error) {
        console.error('Error loading groups:', error);
      }
    }
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.firstName || !formData.lastName || !formData.groupId) {
      alert('Пожалуйста, заполните все обязательные поля');
      return;
    }

    setIsLoading(true);
    
    try {
      const newStudent: Omit<StudentInterface, 'id'> & { uuid: string } = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        middleName: formData.middleName,
        groupId: parseInt(formData.groupId, 10),
        uuid: uuidv4()
      };
      onAdd(newStudent);
      
      // Сброс формы
      setFormData({
        firstName: '',
        lastName: '',
        middleName: '',
        groupId: ''
      });
      
      setIsOpen(false);
      
    } catch (error) {
      console.error('Error adding student:', error);
      alert('Ошибка при добавлении студента');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      firstName: '',
      lastName: '',
      middleName: '',
      groupId: ''
    });
    setIsOpen(false);
  };

  return (
    <div className={styles.addStudent}>
      <button 
        onClick={handleOpen}
        className={styles.addButton}
        disabled={isLoading}
      >
        {isOpen ? 'Отмена' : '+ Добавить студента'}
      </button>

      {isOpen && (
        <div className={styles.formContainer}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <h3 className={styles.title}>Добавить нового студента</h3>
            
            <div className={styles.field}>
              <label htmlFor="lastName" className={styles.label}>
                Фамилия *
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className={styles.input}
                required
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="firstName" className={styles.label}>
                Имя *
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className={styles.input}
                required
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="middleName" className={styles.label}>
                Отчество
              </label>
              <input
                type="text"
                id="middleName"
                name="middleName"
                value={formData.middleName}
                onChange={handleInputChange}
                className={styles.input}
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="groupId" className={styles.label}>
                Группа *
              </label>
              <select
                id="groupId"
                name="groupId"
                value={formData.groupId}
                onChange={handleInputChange}
                className={styles.select}
                required
              >
                <option value="">Выберите группу</option>
                {groups.map(group => (
                  <option key={group.id} value={group.id}>
                    {group.name}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.buttons}>
              <button
                type="button"
                onClick={handleCancel}
                className={styles.cancelButton}
                disabled={isLoading}
              >
                Отмена
              </button>
              <button
                type="submit"
                className={styles.submitButton}
                disabled={isLoading}
              >
                {isLoading ? 'Добавление...' : 'Добавить'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AddStudent;
