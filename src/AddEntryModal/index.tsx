import React from 'react';
import { Modal, Segment } from 'semantic-ui-react';
import { EntryWithoutId } from '../types';
import AddHealthcheckEntryForm from './AddHealthcheckEntryForm';
import { AddOccupationalHCForm } from './AddOccupationalHCEntryForm';
import { AddHospitalEntry } from './AddHospitalEntry';

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EntryWithoutId) => void;
  error?: string;
}

interface OccupationalProps {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EntryWithoutId) => void;
  error?: string;
}

interface HospitalProps {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EntryWithoutId) => void;
  error?: string;
}

export const EntryFormModal = ({ modalOpen, onClose, onSubmit, error }: Props) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Add a new health check entry</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
      <AddHealthcheckEntryForm onSubmit={onSubmit} onCancel={onClose} />
    </Modal.Content>
  </Modal>
);

export const OccupationalEntryFormModal = ({ modalOpen, onClose, onSubmit, error }: OccupationalProps) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Add a new occupational health check entry</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
      <AddOccupationalHCForm onSubmit={onSubmit} onCancel={onClose} />
    </Modal.Content>
  </Modal>
);

export const HospitalEntryFormModal = ({ modalOpen, onClose, onSubmit, error }: HospitalProps) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Add a new hospital entry</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
      <AddHospitalEntry onSubmit={onSubmit} onCancel={onClose} />
    </Modal.Content>
  </Modal>
);