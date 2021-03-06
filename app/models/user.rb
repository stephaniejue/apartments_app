class User < ActiveRecord::Base
  rolify
  has_many :apartments
  after_create :assign_role
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable, :omniauthable,
         :recoverable, :rememberable, :trackable, :validatable

  #automatically assign default role as default
  def assign_role
    add_role :default
  end

  def self.from_omniauth(auth)
    if auth.provider == "facebook"
      where(provider: auth.provider, uid: auth.uid).first_or_create do |user|
        user.email = auth.info.email
        user.password = Devise.friendly_token[0,20]
        end
    elsif auth.provider == "twitter"
      where(provider: auth.provider, uid: auth.uid).first_or_create do |user|
        user.email = auth.info.nickname + "@" + auth.provider + ".com"
        user.password = Devise.friendly_token[0,20]
      end
    end
  end
end
