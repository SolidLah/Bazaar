import {
  Button,
  ButtonGroup,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { sendEmailVerification } from "firebase/auth";
import { useEffect, useState } from "react";
import { useToastedCallback } from "src/lib/hooks";

const VerifyEmailModal = ({ user, email, verified }) => {
  const [isOpen, setOpen] = useState(false);
  const onClose = () => setOpen(false);

  useEffect(() => setOpen(!verified), [verified]);

  const sendEmail = async () => {
    await sendEmailVerification(user);
  };

  const { toastedCallback, loading } = useToastedCallback(
    "Send email verification",
    sendEmail
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      motionPreset="slideInBottom"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Verify Email</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex direction="column" gap="0.1rem">
            <Text>Your email has not been verified</Text>
            <Text fontWeight="bold">{email}</Text>
          </Flex>
        </ModalBody>
        <ModalFooter>
          <ButtonGroup>
            <Button
              colorScheme="purple"
              onClick={toastedCallback}
              isLoading={loading}
            >
              Send email
            </Button>
            <Button onClick={onClose}>Close</Button>
          </ButtonGroup>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default VerifyEmailModal;
