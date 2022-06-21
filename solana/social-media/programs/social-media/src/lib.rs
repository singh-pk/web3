use anchor_lang::prelude::*;

declare_id!("Em6dKWppnzctgydGEGxg3xBmxiAxUnj2vEQYJwQi3RYZ");

#[program]
pub mod social_media {
    use super::*;

    pub fn send_post(ctx: Context<SendPost>, topic: String, content: String) -> Result<()> {
        if content.trim().is_empty() {
            return err!(ErrorCode::EmptyContent);
        }

        if content.chars().count() > 280 {
            return err!(ErrorCode::ContentTooLong);
        }

        if topic.chars().count() > 12 {
            return err!(ErrorCode::TopicTooLong);
        }

        let post = &mut ctx.accounts.post;
        let author = &ctx.accounts.author;
        let clock = Clock::get().unwrap();

        post.author = *author.key;
        post.timestamp = clock.unix_timestamp;
        post.topic = topic;
        post.content = content;

        Ok(())
    }
}

#[error_code]
pub enum ErrorCode {
    #[msg("Topic should not be longer than 12 characters.")]
    TopicTooLong,
    #[msg("Content should not be longer than 280 characters.")]
    ContentTooLong,
    #[msg("Content should not be empty.")]
    EmptyContent,
}

#[derive(Accounts)]
#[instruction(topic: String, content: String)]
pub struct SendPost<'info> {
    #[account(init, payer = author, space = Post::space(&topic, &content))]
    pub post: Account<'info, Post>,
    pub system_program: Program<'info, System>,

    #[account(mut)]
    pub author: Signer<'info>,
}

#[account]
pub struct Post {
    pub author: Pubkey,
    pub timestamp: i64,
    pub topic: String,
    pub content: String,
}

impl Post {
    fn space(topic: &str, content: &str) -> usize {
        8 + 32 + 8 + 4 + topic.len() + 4 + content.len()
    }
}
