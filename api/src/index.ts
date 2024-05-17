import express, {
  type RequestHandler,
  type Request,
  type Response,
  type NextFunction
} from 'express'
import cors from 'cors'
import helmet from 'helmet'
import sequelize from './utils/sequelize'
import jwt from 'jsonwebtoken'
import { expressjwt } from 'express-jwt'
import morgan from 'morgan'
import { createAdminRouter } from './app/routers/admin.route'
import { createQuizRouter } from './app/routers/quiz.route'
import { createQuestionRouter } from './app/routers/question.route'
import { createGameRouter } from './app/routers/game.route'

import axios from 'axios'
import { TwitchUser } from './app/models/twitchUser'
import { createTwitchRouter } from './app/routers/twitch.route'

const app = express()
app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(morgan('dev'))

app.use((_, res, next) => {
  // Modify this middleware in production
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', '*')
  res.setHeader('Access-Control-Allow-Methods', '*')
  next()
})

/**
 * For routes that contains url params, we can use regex to match the url
 * { url: /\/twitch\/user/i }
 */
app.use(
  expressjwt({ secret: 'shhhhh', algorithms: ['HS256'] }).unless({
    path: ['/auth', '/quiz']
  }) as RequestHandler,
  ((_req, _res, next) => {
    next()
  }) as RequestHandler
)

app.use('/admin', createAdminRouter())
app.use(createQuizRouter())
app.use(createGameRouter())
app.use('/question', createQuestionRouter())
app.use(createTwitchRouter())

app.post('/auth', (async (req: Request, res: Response) => {
  const { code } = req.body

  if (code == null) {
    return res.status(400).json({
      message: 'Missing code'
    })
  }

  try {
    const response = await axios.post(
      'https://id.twitch.tv/oauth2/token',
      null,
      {
        params: {
          client_id: process.env.AUTH_TWITCH_ID,
          client_secret: process.env.AUTH_TWITCH_SECRET,
          code,
          grant_type: 'authorization_code',
          redirect_uri: process.env.AUTH_REDIRECT_URI
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    )

    const accessToken = response.data.access_token

    const responseUser = await axios.get(
      'https://api.twitch.tv/helix/users',
      {
        headers: {
          'Client-Id': process.env.AUTH_TWITCH_ID,
          Authorization: `Bearer ${accessToken}`
        }
      }
    )

    const user = responseUser.data.data[0]

    const existingUser = await TwitchUser.findOne({
      where: {
        twitchId: user.id
      }
    })

    if (existingUser != null) {
      const token = jwt.sign({ userId: existingUser.twitchId }, 'shhhhh', {
        expiresIn: '24h'
      })

      return res.json({
        token,
        user: {
          username: user.display_name,
          avatar: user.profile_image_url
        }
      })
    } else {
      const newUser = await TwitchUser.create({
        twitchId: user.id,
        email: user.email
      })

      await newUser.save()

      const token = jwt.sign({ userId: newUser.twitchId }, 'shhhhh', {
        expiresIn: '24h'
      })

      return res.json({
        token,
        user: {
          username: user.display_name,
          avatar: user.profile_image_url
        }
      })
    }
  } catch (error: any) {
    return res.status(500).json({
      message: 'Internal server error'
    })
  }
}) as RequestHandler)

const syncTables = async (_req: Request, res: Response): Promise<Response> => {
  await sequelize.sync({ force: true })

  return res.json({
    message: 'Database synced successfully'
  })
}

app.get('/syncTables', (syncTables) as RequestHandler)

app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  if (err.status === 401) {
    return res.status(401).json({
      message: 'Unauthorized'
    })
  }

  if (err.status === 403) {
    return res.status(403).json({
      message: 'Forbidden'
    })
  }

  return res.status(500).json({
    message: 'Internal server error'
  })
})

app.listen(3000, () => {
  console.log('Server is running on port 3000')
})
