import { Tables } from "../../utils/database/types";
import {
  VStack,
  Box,
  Text,
  Heading,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  IconButton,
  Badge,
  WrapItem,
  Icon,
  Circle,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { DeleteIcon } from "@chakra-ui/icons";
import {
  deleteNotification,
  notificationListener,
  getAllNotifications,
} from "../../backend-queries";
import { Notifications } from "../../backend-queries/query/get-all-notifications";
import { LuBell } from "react-icons/lu";
import { readNotifactions } from "../../backend-queries/update/read-notifications";

interface NotificationDialogProps {}

export function NotificationDialog({}: NotificationDialogProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [notifications, setNotifications] = useState<Tables<"notifications">[]>(
    []
  );

  const [hasUnread, setHasUnread] = useState(false);

  useEffect(() => {
    const fetchNotifications = async () => {
      const fetchedNotifications: Notifications = await getAllNotifications(
        setNotifications
      );

      const unreadExists = fetchedNotifications.some(
        (notification) => !notification.is_read
      );
      setHasUnread(unreadExists);
    };

    fetchNotifications();

    notificationListener((payload) => {
      if (payload.eventType === "INSERT" || payload.eventType === "UPDATE") {
        fetchNotifications();
      }
    });
  }, []);

  return (
    <>
      <Box onClick={onOpen} as="span" position="relative">
        <WrapItem cursor="pointer" mx={4}>
          <Icon as={LuBell} boxSize={6} />
          {hasUnread && (
            <Circle
              size="8px"
              bg="accentColor"
              position="absolute"
              top="0"
              right="4"
            />
          )}
        </WrapItem>
      </Box>

      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose();
          readNotifactions();
          setHasUnread(false);
        }}
        size="lg"
      >
        <ModalOverlay />
        <ModalContent height="80vh" my={8}>
          <ModalHeader>Benachrichtigungen</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {notifications.length === 0 ? (
              <Box textAlign="center" py={6}>
                <Heading size="md">Keine neuen Benachrichtigungen</Heading>
              </Box>
            ) : (
              <VStack spacing={4} height="70vh" overflowY="auto">
                {notifications.map((notification, index) => (
                  <Box
                    key={index}
                    p={4}
                    borderWidth="2px"
                    borderRadius="md"
                    bg={"tileBgColor"}
                    boxShadow="sm"
                    _hover={{ bg: "tileBgColor", boxShadow: "md" }}
                    position="relative"
                  >
                    {!notification.is_read && (
                      <Badge
                        bg="dangerColor"
                        position="absolute"
                        top="4px"
                        right="4px"
                      >
                        Neu
                      </Badge>
                    )}
                    <HStack justifyContent="space-between">
                      <Box>
                        <Text fontSize="lg" fontWeight="bold" mb={1}>
                          {notification.title}
                        </Text>
                        <Text fontSize="sm">
                          {notification.description ||
                            "Keine Details verfügbar."}
                        </Text>
                      </Box>

                      <IconButton
                        aria-label="Löschen"
                        icon={<DeleteIcon />}
                        size="lg"
                        color="accentColor"
                        onClick={async () => {
                          try {
                            await deleteNotification(notification.id);
                            setNotifications(
                              notifications.filter(
                                (n) => n.id !== notification.id
                              )
                            );

                            const unreadExists = notifications.some(
                              (n) => n.id !== notification.id && !n.is_read
                            );
                            setHasUnread(unreadExists);
                          } catch (e) {
                            throw new Error(
                              "Fehler beim Löschen der Benachrichtigung: " + e
                            );
                          }
                        }}
                      />
                    </HStack>
                  </Box>
                ))}
              </VStack>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
