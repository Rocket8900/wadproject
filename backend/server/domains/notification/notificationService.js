import Logging from "../../utils/loggings.js";
import { prisma_db } from "../../utils/prismaConnection.js";



export default class NotificationService {

    static createNewNotification = async (userId) => {
        try {
            const notification = await prisma_db.notification.create({
                data: {
                    userId : userId
                }
            })
            return notification;
        } catch (error) {
            Logging.error(error);
            return null
        }
    }

    static getLatestNotificationForUser = async (userId) => {
        try {
            const notification = await prisma_db.notification.findFirst({
                where: {
                    userId: userId
                }
            })
            return notification;
        } catch (error) {
            Logging.error(error);
            return null
        }
    }

    static updateLatestNotificationForUser = async (notificationId) => {
        try {
            const notification = await prisma_db.notification.update({
                where: {
                    id: notificationId,
                },
                data: {
                    read: true
                }
            })
            return notification
        } catch (error) {
            Logging.error(error);
            return null
        }
    }




}