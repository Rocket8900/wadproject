import NotificationService from "./notificationService.js";
import Logging from "../../utils/loggings.js";




export default class NotificationController {

    static createNewNotification = async (userId) => {
        try {
            const notification = await NotificationService.createNewNotification(userId)
            if (!notification) {
                Logging.warn("failed to create a new notification tag")
                return false;
            }
            Logging.info(`created a new notification for user ${userId}`)
            return true
        } catch (error) {
            Logging.error(error)
            return false;
        }
    }

    static userReadsNotification = async (req, res) => {
        try {
            const userId = req.user.id
            const latestNotification = await NotificationService.getLatestNotificationForUser(userId)
            const updatedNotification = await NotificationService.updateLatestNotificationForUser(latestNotification.id)
            if (!updatedNotification) {
                Logging.warn(`error updating notifications to read for user`)
                return res.status(400).json({ error: "cannot update notification object"})
            }
            Logging.info("updated notification status for user")
            return res.status(201).json({data: updatedNotification})
        } catch (error) {
            Logging.error(error)
            return res.status(500).json({ error: "an unexpected error occurred" });
        }
    }

    static getUserNotificationStatus = async (req, res) => {
        try {
            const userId = req.user.id
            const latestNotification = await NotificationService.getLatestNotificationForUser(userId)
            if (!latestNotification) {
                Logging.warn(`error getting latest notifications for user`)
                return res.status(200).json({ error: "cannot get latest notification"})
            }
            Logging.info("updated notification status for user")
            return res.status(201).json({data: latestNotification})
        } catch (error) {
            Logging.error(error)
            return res.status(500).json({ error: "an unexpected error occurred" });
        }
    }


}